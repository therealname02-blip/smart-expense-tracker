/**
 * CSV Export Utility
 */

export const exportExpensesToCSV = (expenses, filename = 'filtered_expenses.csv') => {
  if (!expenses || !expenses.length) {
    alert('No expenses to export.');
    return;
  }

  const headers = ['ID', 'Date', 'Title', 'Category', 'Budget Group', 'Amount', 'Payment Method', 'Notes'];
  
  const rows = expenses.map(item => [
    item.id,
    item.date || '',
    `"${(item.title || '').replace(/"/g, '""')}"`,
    item.category || '',
    item.type || '',
    Number(item.amount).toFixed(2),
    item.paymentMethod || '',
    `"${(item.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
