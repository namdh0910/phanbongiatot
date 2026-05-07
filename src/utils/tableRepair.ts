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

        // Priority 3: Capitalized phrases
        if (titles.length !== colCount) {
           const headerText = cell.textContent || "";
           const matches = headerText.match(/[A-ZÀ-Ỹ][^A-ZÀ-Ỹ]*/g);
           if (matches && matches.length === colCount) {
              titles = matches.map(m => m.trim());
           }
        }

        // Priority 4: Blind split
        if (titles.length !== colCount) {
            const headerText = cell.textContent || "";
            const words = headerText.split(/\s+/).filter(w => w.length > 0);
            if (words.length >= colCount) {
               const wordsPerCol = Math.floor(words.length / colCount);
               titles = [];
               for (let i = 0; i < colCount; i++) {
                  const start = i * wordsPerCol;
                  const end = (i === colCount - 1) ? words.length : (i + 1) * wordsPerCol;
                  titles.push(words.slice(start, end).join(' '));
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
