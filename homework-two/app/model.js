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
        src="images/AdobeStock_model.jpg"
        alt="Fashion model looking to her left, posing in a black, metal chair"
      />
      <p>Project One</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_art.jpg"
        alt="Three paintings displayed on a white wall in a museum or gallery"
      />
      <p>Project Two</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_city.jpg"
        alt="Wide overhead shot of a city landscape"
      />
      <p>Project Three</p>
    </div>
    <div class="square">
      <img
        src="images/AdobeStock_field.jpg"
        alt="Woman standing in a field facing the sun with her arms out behind her"
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
      <img src="images/AdobeStock_tom.png" alt="Portrait of man smiling" />
      <p>
        <b>Tom Daniels</b> <br />
        Specializes in Fine Arts Photography <br />
        <em>tomdaniels@cc.com</em>
      </p>
    </div>
    <div class="stacy">
      <img src="images/AdobeStock_stacy.png" alt="Portrait of woman smiling" />
      <p>
        <b>Stacy Miller</b> <br />
        Specializes in Fashion Photography <br />
        <em>stacymiller@cc.com</em>
      </p>
    </div>
    <div class="lupa">
      <img src="images/AdobeStock_lupa.png" alt="Portrait of woman smiling" />
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
        src="images/AdobeStock_beach.jpg"
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
  <img src="images/AdobeStock_land1.jpg" alt="Wooden dock overlooking beautiful lake" />
  <img src="images/AdobeStock_land2.jpg" alt="Landscape of lake at sunset with trees and mountains in the background" />
  <img src="images/AdobeStock_land3.jpg" alt="Several canoes floating at shore with colorful apartment buildings in the distance" />
  <img src="images/AdobeStock_land4.jpg" alt="Person sitting on kayak in the middle of the ocean facing mountains in the distance" />
  <img src="images/AdobeStock_land5.jpg" alt="Hot air balloon floating above mountains during sunset" />
  <img src="images/AdobeStock_land6.jpg" alt="Sailboat floating towards the horizon in the middle of the ocean at dusk" />
  <img src="images/AdobeStock_fashion1.jpg" alt="Two women wearing jumpsuits posing near a stairway with a large plant to their left" />
  <img src="images/AdobeStock_fashion2.jpg" alt="Man and woman wearing black clothing and sunglasses sitting on a stool back to back" />
  <img src="images/AdobeStock_fashion3.jpg" alt="Woman wearing a hat and trench coat standing in a wheat field looking ahead towards the distance" />
  <img src="images/AdobeStock_fashion4.jpg" alt="Two women wearing bright jackets and jeans, standing in a field and looking towards the camera" />
  <img src="images/AdobeStock_fashion5.jpg" alt="Man standing in front of a white background, dressed in dark clothing and a tan trench coat looking to his left" />
  <img src="images/AdobeStock_fashion6.jpg" alt="Woman standing in a field at sunrise wearing a sherpa jacket and touching a bright colored hat that rests on her head" />
  <img src="images/AdobeStock_arts1.jpg" alt="Woman facing away from the camera holding a paintbrush up to a large canvas painting" />
  <img src="images/AdobeStock_arts2.jpg" alt="Man facing away from the camera standing behind several timpani drums looking towards the rest of the orchestra" />
  <img src="images/AdobeStock_arts3.jpg" alt="Blonde woman wearing dark jacket looking at a painting in a gallery" />
  <img src="images/AdobeStock_arts4.jpg" alt="Dancer wearing a bright orange dress posing in front of a dark background" />
  <img src="images/AdobeStock_arts5.jpg" alt="A close-up shot of an artist's hand holding a paintbrush up to a large canvas painting" />
  <img src="images/AdobeStock_arts6.jpg" alt="A man and woman in conversation while looking at several pieces of artwork in a gallery" />
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
    <img src="images/AdobeStock_beg.jpg" alt="Photographer holding a camera up to her face" />
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
    <img src="images/AdobeStock_med.jpg" alt="Fashion model facing the left holding a large leaf as her skirt blows in the wind" />
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
    <img src="images/AdobeStock_adv.jpg" alt="Silhouette of a photographer in the distance pointing his camera up at the starry night sky" />
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
