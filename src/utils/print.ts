export const printQuotation = () => {
  const printContent = document.getElementById('printable-content');
  const originalContent = document.body.innerHTML;

  if (printContent) {
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
  }
};