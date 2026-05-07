'use client';
// UI panel in admin to trigger article generation with live status updates

import React, { useState } from 'react';

interface GenerateFormData {
  topic: string;
  keyword: string;
  targetCrop: string;
  urgencyLevel: 'normal' | 'urgent';
}

interface GeneratedArticle {
  title: string;
  metaDescription: string;
  slug: string;
  content: string;
  wordCount: number;
  tags: string[];
  heroImage: { cloudinaryUrl: string; alt: string };
  images: Array<{ cloudinaryUrl: string; alt: string; caption: string }>;
}

type Step = 'idle' | 'generating' | 'fetching-images' | 'done' | 'error';

const CROP_OPTIONS = [
  { value: 'sau-rieng', label: '🌳 Sầu riêng' },
  { value: 'ca-phe',    label: '☕ Cà phê' },
  { value: 'ho-tieu',   label: '🌿 Hồ tiêu' },
];

const STEP_LABELS: Record<Step, string> = {
  idle:            '',
  generating:      '✍️ Claude đang viết bài (khoảng 30–60 giây)...',
  'fetching-images': '🖼️ Đang lấy ảnh từ Pexels & upload Cloudinary...',
  done:            '✅ Hoàn tất!',
  error:           '❌ Có lỗi xảy ra',
};

interface Props {
  onArticleGenerated: (article: GeneratedArticle) => void;
}

export default function GenerateArticlePanel({ onArticleGenerated }: Props) {
  const [form, setForm] = useState<GenerateFormData>({
    topic: '',
    keyword: '',
    targetCrop: 'sau-rieng',
    urgencyLevel: 'normal',
  });
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<GeneratedArticle | null>(null);

  const isLoading = step === 'generating' || step === 'fetching-images';

  async function handleGenerate() {
    if (!form.topic.trim() || !form.keyword.trim()) {
      setError('Vui lòng nhập chủ đề và keyword chính.');
      return;
    }
    setError('');
    setPreview(null);

    try {
      // Step 1: Claude generating
      setStep('generating');

      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: form.topic,
          keyword: form.keyword,
          targetCrop: form.targetCrop,
          urgencyLevel: form.urgencyLevel,
          category: 'cam-nang-ky-thuat',
        }),
      });

      // Note: the API does all steps server-side, but we update UI
      // to fetching-images after ~5s to indicate progress
      const progressTimer = setTimeout(() => setStep('fetching-images'), 8000);

      const data = await res.json();
      clearTimeout(progressTimer);

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      setPreview(data.article);
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
      setStep('error');
    }
  }

  function handleUseArticle() {
    if (preview) onArticleGenerated(preview);
  }

  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* ── Form ── */}
      <div style={{
        background: '#f9fafb',
        border: '1.5px solid #e5e7eb',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
          🤖 Tạo bài tự động với AI
        </div>

        {/* Topic */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Chủ đề bài viết *
          </label>
          <input
            type="text"
            value={form.topic}
            onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
            placeholder="VD: Sầu riêng vàng lá thối rễ mùa mưa"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              fontSize: 14,
              background: '#fff',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        {/* Keyword */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Keyword SEO chính *
          </label>
          <input
            type="text"
            value={form.keyword}
            onChange={e => setForm(f => ({ ...f, keyword: e.target.value }))}
            placeholder="VD: sầu riêng vàng lá thối rễ"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              fontSize: 14,
              background: '#fff',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        {/* Crop + Urgency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Cây trồng
            </label>
            <select
              value={form.targetCrop}
              onChange={e => setForm(f => ({ ...f, targetCrop: e.target.value }))}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #e5e7eb',
                borderRadius: 10,
                fontSize: 14,
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              {CROP_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Mức độ
            </label>
            <select
              value={form.urgencyLevel}
              onChange={e => setForm(f => ({ ...f, urgencyLevel: e.target.value as 'normal' | 'urgent' }))}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #e5e7eb',
                borderRadius: 10,
                fontSize: 14,
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="normal">Bình thường</option>
              <option value="urgent">Khẩn cấp (thêm warning)</option>
            </select>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '13px 20px',
            background: isLoading ? '#d1fae5' : '#1a5c2a',
            color: isLoading ? '#15803d' : '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.02em',
          }}
        >
          {isLoading ? '⏳ Đang tạo bài...' : '⚡ Tạo bài tự động'}
        </button>
      </div>

      {/* ── Progress indicator ── */}
      {step !== 'idle' && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 13,
          fontWeight: 500,
          background: step === 'error' ? '#fee2e2' : step === 'done' ? '#dcfce7' : '#eff6ff',
          color: step === 'error' ? '#b91c1c' : step === 'done' ? '#166534' : '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          {isLoading && (
            <span style={{
              display: 'inline-block',
              width: 14,
              height: 14,
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          )}
          {STEP_LABELS[step]}
          {step === 'done' && preview && (
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#166534' }}>
              {preview.wordCount.toLocaleString()} từ · {preview.images.length} ảnh
            </span>
          )}
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div style={{
          padding: '10px 14px',
          background: '#fee2e2',
          borderRadius: 8,
          color: '#b91c1c',
          fontSize: 13,
          marginBottom: 12,
        }}>
          {error}
        </div>
      )}

      {/* ── Preview card ── */}
      {preview && step === 'done' && (
        <div style={{
          border: '2px solid #16a34a',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 12,
        }}>
          {/* Hero image preview */}
          {preview.heroImage && (
            <div style={{ position: 'relative' }}>
              <img
                src={preview.heroImage.cloudinaryUrl}
                alt={preview.heroImage.alt}
                style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#16a34a',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 6,
              }}>
                {preview.images.length} ảnh
              </div>
            </div>
          )}

          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 4, lineHeight: 1.4 }}>
              {preview.title}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10, lineHeight: 1.5 }}>
              {preview.metaDescription}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {preview.tags.slice(0, 5).map(tag => (
                <span key={tag} style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  background: '#f0fdf4',
                  color: '#166534',
                  borderRadius: 99,
                  border: '1px solid #bbf7d0',
                  fontWeight: 600,
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              marginBottom: 14,
              padding: '10px 0',
              borderTop: '1px solid #f0fdf4',
              borderBottom: '1px solid #f0fdf4',
            }}>
              {[
                { label: 'Số từ', value: preview.wordCount.toLocaleString() },
                { label: 'Số ảnh', value: String(preview.images.length) },
                { label: 'Slug', value: `/${preview.slug.slice(0, 16)}...` },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1a5c2a' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Use article button */}
            <button
              onClick={handleUseArticle}
              style={{
                width: '100%',
                padding: '11px 16px',
                background: '#1a5c2a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Dùng bài này → Mở trong Editor
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
