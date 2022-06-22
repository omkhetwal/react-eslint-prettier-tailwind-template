import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className=" py-2 px-10  flex items-center justify-between">
      {/* bg-[#fffaf1] */}
      <span className="inline-block">
        <Link to="/" className="text-[#003B54] text-2xl font-medium">
          Utopia <br /> Farming
        </Link>
      </span>
      <div className="space-x-10">
      <Link to="/community" className="bg-[#dcfce7] text-[#059669] p-2 rounded">
          Community
        </Link>
        <Link to="/about" className="bg-[#dcfce7] text-[#059669] p-2 rounded">
          About
        </Link>
        <Link to="/contact" className="bg-[#dcfce7] text-[#059669] p-2 rounded">
          Contact
        </Link>
      </div>
    </div>
  );
}

export default Header;
