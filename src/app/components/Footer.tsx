// /app/components/Footer.tsx
'use client';

const Footer = () => {
  return (
    <footer style={{ 
      position: 'sticky', bottom: 0, backgroundColor: '#fff', zIndex: 10,border:'1px solid #ddd',marginTop:'150px',flex:'flex-end',textAlign:'center'}}>
      <div className="div">
      <h1>Footer</h1>
      </div>
    </footer>
  );
};

export default Footer;
