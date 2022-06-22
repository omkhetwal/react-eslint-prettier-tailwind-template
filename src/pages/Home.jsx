import imageB from '../images/b.png';
import imageA from '../images/a.png';

function Home() {
  return (
    <div className='overflow-hidden'>
      {/*  className="bg-[#fffaf1]" */}
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between space-x-40">
          <h2 className="text-7xl text-[#003B54] font-bold">Utopia Farming</h2>
          <img src={imageB} alt="" className="object-cover" />
        </div>
        <img src={imageA} alt="" />
      </div>
    </div>
  );
}

export default Home;
