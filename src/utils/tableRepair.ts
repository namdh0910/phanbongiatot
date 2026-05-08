/**
 * Utility to repair broken table structures (merged headers) from AI generated content
 */

export const applyHeaderStyles = (th: HTMLElement) => {
  th.style.border = "1px solid #cbd5e0";
  th.style.padding = "15px";
  th.style.backgroundColor = "#f8fafc";
  th.style.color = "#1a5c2a";
  th.style.fontWeight = "800";
  th.style.textAlign = "left";
  th.style.textTransform = "uppercase";
  th.style.fontSize = "12px";
  th.style.letterSpacing = "0.05em";
};

export const repairTablesInHtml = (html: string) => {
  if (typeof window === 'undefined') return html; // SSR check
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const tables = doc.querySelectorAll('table');

  tables.forEach(table => {
    const thead = table.querySelector('thead');
    const tbodyRows = table.querySelectorAll('tbody tr');
    if (!tbodyRows.length) return;

    const firstRowCells = tbodyRows[0].querySelectorAll('td');
    const colCount = firstRowCells.length;
    
    if (thead && colCount > 1) {
      const headerCells = thead.querySelectorAll('th');
      if (headerCells.length === 1) {
        const cell = headerCells[0];
        let titles: string[] = [];

        // Priority 1: Strong tags
        const strongTags = cell.querySelectorAll('strong');
        if (strongTags.length === colCount) {
          titles = Array.from(strongTags).map(s => s.textContent || "").filter(t => t.trim());
        } 
        
        // Priority 2: Common separators
        if (titles.length !== colCount) {
          const headerText = cell.textContent || "";
          const splitBySpecial = headerText.split(/\t|\n|\s{2,}/).map(t => t.trim()).filter(t => t.length > 0);
          if (splitBySpecial.length === colCount) {
            titles = splitBySpecial;
          }
        }

        // Priority 3: Capitalized phrases (Improved for Vietnamese)
        if (titles.length !== colCount) {
           const headerText = cell.textContent || "";
           // Match groups starting with Uppercase (including Vietnamese accented caps)
           const matches = headerText.match(/[A-ZÂÊÔƠƯÀẢÃÁẠÈẺẼÉẸÌỈĨÍỊÒỎÕÓỌÙỦŨÚỤỲỶỸÝỴĐ][^A-ZÂÊÔƠƯÀẢÃÁẠÈẺẼÉẸÌỈĨÍỊÒỎÕÓỌÙỦŨÚỤỲỶỸÝỴĐ]*/g);
           if (matches && matches.length === colCount) {
              titles = matches.map(m => m.trim());
           }
        }

        // Priority 4: Balanced Word Split (New fallback)
        if (titles.length !== colCount) {
            const headerText = cell.textContent || "";
            const words = headerText.split(/\s+/).filter(w => w.length > 0);
            if (words.length >= colCount) {
               // Try to distribute words as evenly as possible
               const wordsPerCol = Math.floor(words.length / colCount);
               const extraWords = words.length % colCount;
               titles = [];
               let currentWordIndex = 0;
               for (let i = 0; i < colCount; i++) {
                  const count = wordsPerCol + (i < extraWords ? 1 : 0);
                  titles.push(words.slice(currentWordIndex, currentWordIndex + count).join(' '));
                  currentWordIndex += count;
               }
            }
        }
        
        if (titles.length === colCount) {
          const newTr = doc.createElement('tr');
          titles.forEach(title => {
            const th = doc.createElement('th');
            th.textContent = title;
            applyHeaderStyles(th);
            newTr.appendChild(th);
          });
          thead.innerHTML = '';
          thead.appendChild(newTr);
        } else {
          // If still failed, at least style the single cell
          applyHeaderStyles(cell as HTMLElement);
        }
      } else if (headerCells.length > 0) {
        headerCells.forEach(th => applyHeaderStyles(th as HTMLElement));
      }
    }

    // General table styling
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.margin = "20px 0";
    table.style.border = "1px solid #cbd5e0";
    
    table.querySelectorAll('td').forEach(td => {
      (td as HTMLElement).style.border = "1px solid #cbd5e0";
      (td as HTMLElement).style.padding = "12px";
    });
  });

  return doc.body.innerHTML;
};

/**
 * Clean overall expert content: strip newlines, remove anchors, normalize spaces, remove AI residue, and repair tables.
 * Safe for both Server (SSR) and Client.
 */
export const cleanExpertContent = (html: string) => {
  if (!html) return '';
  
  // 1. Remove {#anchor} tags
  let cleaned = html.replace(/\{#[\w-]+\}/g, '');
  cleaned = cleaned.replace(/\{#[\w-]+\}/g, '');

  // 3. Remove AI assistant URLs (Claude, ChatGPT residue)
  cleaned = cleaned.replace(/https?:\/\/(www\.)?(claude\.ai|chatgpt\.com|perplexity\.ai|anthropic\.com)\/[^\s"'>]+/gi, '');
  
  // 4. Normalize spaces and entities
  cleaned = cleaned.replace(/&nbsp;/g, ' ')
                   .replace(/\s{2,}/g, ' ')
                   .trim();
  
  // 5. Run table repair (only executes in browser context)
  return repairTablesInHtml(cleaned);
};
