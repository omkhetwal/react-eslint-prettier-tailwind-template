function Contact() {
  return <div> 
    <div className="p-10">
       <h2 className="text-4xl mb-5">Information</h2>
       <p>
         Contact us to get more information you are interested in.<br/>
         83/7 Church Road, Clement Town , Dehradun<br/>
         Call Free : 1-888-123-456<br/>
         Mon - Sat 9:00am - 6:00pm <br/>
       </p>
    </div>
    <div className="flex justify-center items-center">
        <li><a href="#"><i className="fa fa-instagram text-lg"></i></a></li>
        <li><a href="#"><i className="fa fa-twitter text-lg"></i></a></li>
        <li><a href="#"><i className="fa fa-linkedin text-lg"></i></a></li>
        <li><a href="#"><i className="fa fa-codepen text-lg"></i></a></li>
    </div>
  </div>;
}

export default Contact;
