var MODEL = (function () {
  var _homePageInfo = `
<section class="home">
<div class="work">
  <h3>Recent Work</h3>
  <p class="desc">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
    earum, quia nulla eaque a incidunt ex cupiditate reiciendis impedit,
    dolore aliquam quo sit obcaecati est porro ut beatae mollitia ullam.
  </p>
  <div class="projects">
    <div class="square">
      <img
        src="images/AdobeStock_model.jpeg"
        alt="Fashion model posing in a chair"
      />
      <p>Project One</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_art.jpeg"
        alt="Wide shot of a city landscape"
      />
      <p>Project Two</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_city.jpeg"
        alt="Paintings displayed in a museum"
      />
      <p>Project Three</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_field.jpeg"
        alt="Woman standing in a field"
      />
      <p>Project Four</p>
    </div>
  </div>
</div>
<div class="contact">
  <div class="text">
    <h4>Inquiries?</h4>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
      officiis odit quia, quasi libero, tempore perspiciatis voluptas
      rerum consectetur asperiores cumque pariatur cum quaerat doloribus
      molestias ad dignissimos? Voluptates porro accusamus, qui
      perferendis molestias consequuntur?
    </p>
    <button>Contact Us</button>
  </div>
</div>
</section>`;
  var _aboutPageInfo = `
<section class="about">
<div class="info">
  <h2>About Us</h2>
  <p><em>More than award-winning</em></p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
    molestiae nam aperiam ducimus mollitia beatae repellendus accusamus
    nisi aut possimus repudiandae, rem omnis asperiores unde, culpa eum
    odio dignissimos totam explicabo harum numquam praesentium suscipit
    iure! Ipsa labore, vitae omnis quibusdam magni odit sapiente, ea
    aspernatur blanditiis iusto maiores atque tempora libero. Nisi
    adipisci similique expedita et ad quam libero quis recusandae voluptas
    odit deserunt labore minima corrupti nostrum magni, eligendi, quas,
    eveniet iste soluta odio? Impedit labore, adipisci perferendis eaque,
    magnam consequuntur illum laudantium odio quisquam incidunt a mollitia
    suscipit id nisi aliquam corrupti nostrum placeat dignissimos aut
    dolore. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Necessitatibus nisi minima ea aperiam beatae quisquam deleniti labore
    quis quae in.
  </p>
</div>
<div class="team">
  <h3>Meet the Team</h3>
  <br />
  <div class="people">
    <div class="tom">
      <img src="images/AdobeStock_tom.png" alt="Man smiling" />
      <p>
        <b>Tom Daniels</b> <br />
        Specializes in Fine Arts Photography <br />
        <em>tomdaniels@cc.com</em>
      </p>
    </div>
    <div class="stacy">
      <img src="images/AdobeStock_stacy.png" alt="Woman smiling" />
      <p>
        <b>Stacy Miller</b> <br />
        Specializes in Fashion Photography <br />
        <em>stacymiller@cc.com</em>
      </p>
    </div>
    <div class="lupa">
      <img src="images/AdobeStock_lupa.png" alt="Woman smiling" />
      <p>
        <b>Lupa Hernandez</b> <br />
        Specializes in Landscape Photography <br />
        <em>lupahernandez@cc.com</em>
      </p>
    </div>
  </div>
</div>
<div class="in-touch">
  <div class="contact">
    <form action="#">
      <h3>Get in Touch</h3>
      <label for="subject">Subject</label>
      <input type="text" id="subject" /><br />

      <label for="name">Name&nbsp;&nbsp;</label>
      <input type="text" id="name" />

      <label for="email">Email</label>
      <input type="email" id="email" /><br /><br />

      <label for="comments">Comments</label><br /><br />
      <textarea type="text" id="comments"></textarea><br /><br />

      <button type="submit">Send</button>
    </form>
    <div class="right">
      <p>capturecollective@gmail.com • (518) 739-2029</p>
      <img
        src="images/AdobeStock_beach.jpeg"
        alt="Arial view of waves on a beach"
      />
    </div>
  </div>
</div>
</section>`;
  var _galleryPageInfo = `
<section class="gallery">
<div class="top">
  <div class="text">
    <h2>Gallery Wall</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
      recusandae sint quidem distinctio quae temporibus labore officiis
      unde voluptatum porro? Veniam deleniti fuga at quam tempore
      distinctio natus laborum nulla.
    </p>
    <p><em>Browse our favorite pieces and enjoy!</em></p>
  </div>
  <div class="list">
    <p>
      <b>Our Clients Include</b>
    </p>
    <p>New York Times -</p>
    <p>Ralph Lauren -</p>
    <p>Bon Appétit -</p>
    <p>Columbia -</p>
    <p>Condé Nast Traveller -</p>
    <p>Topo Designs -</p>
    <p>Snow Peak -</p>
    <p>& more!</p>
  </div>
</div>
<br />
<div class="grid">
  <img src="images/AdobeStock_land1.jpeg" alt="" />
  <img src="images/AdobeStock_land2.jpeg" alt="" />
  <img src="images/AdobeStock_land3.jpeg" alt="" />
  <img src="images/AdobeStock_land4.jpeg" alt="" />
  <img src="images/AdobeStock_land5.jpeg" alt="" />
  <img src="images/AdobeStock_land6.jpeg" alt="" />
  <img src="images/AdobeStock_fashion1.jpeg" alt="" />
  <img src="images/AdobeStock_fashion2.jpeg" alt="" />
  <img src="images/AdobeStock_fashion3.jpeg" alt="" />
  <img src="images/AdobeStock_fashion4.jpeg" alt="" />
  <img src="images/AdobeStock_fashion5.jpeg" alt="" />
  <img src="images/AdobeStock_fashion6.jpeg" alt="" />
  <img src="images/AdobeStock_arts1.jpeg" alt="" />
  <img src="images/AdobeStock_arts2.jpeg" alt="" />
  <img src="images/AdobeStock_arts3.jpeg" alt="" />
  <img src="images/AdobeStock_arts4.jpeg" alt="" />
  <img src="images/AdobeStock_arts5.jpeg" alt="" />
  <img src="images/AdobeStock_arts6.jpeg" alt="" />
</div>
</section>`;
  var _coursesPageInfo = `
<section class="courses">
<div class="text">
  <h2>Our Courses</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quam
    similique minus eligendi, commodi doloribus illum, possimus beatae
    temporibus rem, voluptatibus accusantium quod totam. Debitis?
  </p>
</div>
<div class="card beg">
  <div class="details">
    <img src="images/AdobeStock_beg.jpeg" alt="" />
    <div>
      <h3>Basics of Point + Shoot Photography</h3>
      <p><b>Instructor:</b> Tom Daniels</p>
      <p><b>Level:</b> Beginner</p>
      <p><b>Time:</b> M/W 1-3pm • 8 weeks starting July 3rd</p>
      <p><b>Location:</b> NYU Building #4 Room A210</p>
      <p><b>Price:</b> $70</p>
      <button>Sign Up</button>
    </div>
  </div>
</div>
<div class="card int">
  <div class="details">
    <img src="images/AdobeStock_med.jpeg" alt="" />
    <div>
      <h3>Perfecting Fashion Photography</h3>
      <p><b>Instructor:</b> Stacy Miller</p>
      <p><b>Level:</b> Intermediate</p>
      <p><b>Time:</b> Th 10am-3pm • 6 weeks starting September 22nd</p>
      <p><b>Location:</b> Runway Studios on 38th St.</p>
      <p><b>Price:</b> $100</p>
      <button>Sign Up</button>
    </div>
  </div>
</div>
<div class="card adv">
  <div class="details">
    <img src="images/AdobeStock_adv.jpeg" alt="" />
    <div>
      <h3>How to Shoot Landscapes: 101</h3>
      <p><b>Instructor:</b> Lupa Hernandez</p>
      <p><b>Level:</b> Advanced</p>
      <p><b>Time:</b> F 4-8pm • 9 weeks starting August 15th</p>
      <p><b>Location:</b> Anderson Pier Dock #27</p>
      <p><b>Price:</b> $120</p>
      <button>Sign Up</button>
    </div>
  </div>
</div>
</section>`;

  var _getMyPage = function (buttonID) {
    console.log("Model.js 240 " + buttonID);
    let pageVar = "_" + buttonID + "PageInfo";
    console.log(pageVar);
    //replacing the content div with new html from pageVar
    $("#content").html(eval(pageVar));
  };

  return {
    getMyPage: _getMyPage,
  };
})();
