import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage,
  pricing,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
          backgroundColor: '#f40',
          color: 'white',
          padding: '1rem',
        }}
      >
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Features gridItems={intro.blurbs} />
              <div className="columns">
                <div className="column is-7">
                  <h3 className="has-text-weight-semibold is-size-3">
                    {main.heading}
                  </h3>
                  <p>{main.description}</p>
                </div>
              </div>
              <div className="tile is-ancestor">
                <div className="tile is-vertical">
                  <div className="tile">
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image1} />
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image2} />
                      </article>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={main.image3} />
                    </article>
                  </div>
                </div>
              </div>
              <Testimonials testimonials={testimonials} />
              <div
                className="full-width-image-container"
                style={{
                  backgroundImage: `url(${
                    fullImage.childImageSharp
                      ? fullImage.childImageSharp.fluid.src
                      : fullImage
                  })`,
                }}
              />
              <h2 className="has-text-weight-semibold is-size-2">
                {pricing.heading}
              </h2>
              <p className="is-size-5">{pricing.description}</p>
              <Pricing data={pricing.plans} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`

// var getJSON = function (url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.responseType = "json";
//   xhr.onload = function () {
//     var status = xhr.status;
//     if (status === 200) {
//       callback(null, xhr.response);
//     } else {
//       callback(status, xhr.response);
//     }
//   };
//   xhr.send();
// };

// getJSON(
//   "http://feed.adrecord.com/atletbutiken.json?id=96afc4f6a468",
//   function (err, data) {
//     if (err !== null) {
//       alert("Something went wrong: " + err);
//     } else {
//       alert("Your query count: " + data.query.count);
//     }
//   }
// );
let url = "http://feed.adrecord.com/atletbutiken.json?id=96afc4f6a468";

fetch(url)
  .then((res) => res.json())
  .then((out) => {
    console.log("Checkout this JSON! ", out);
    var filteredCategories = out.products.map(function (cat) {
      return cat === "TRÄNINGSPRODUKTER";
    });

    console.log(filteredCategories);
  })
  .catch((err) => {
    throw err;
  });


  // Array for to put the found objects in.
// var myCats = [];

// // Iterate over the array of objects.
// for (var i = 0; i < field.length; i++) {
//    // Iterate over the properties of the single object.
//    for (var j in field[i]["categories"]) {
//      // Does it contain the searched categoryName? 
//      //   'category02' in this case.
//      if (field[i]["categories"][j]["TR\u00c4NINGSREDSKAP"] === "Viktskivor") {
//        // Make a deep clone of the object.
//        //   Push the new object to to collector array.
//        myCats.push(Object.create(JSON.parse(JSON.stringify(field[i]))));
//      }   
//   }
// }

// // Test
// for (i = 0; i < myCats.length; i++) {
//   console.log(myCats[i]);
// }

// var filteredCategories = data.categories.map(function (cat) {
//   return cat === "TR\u00c4NINGSREDSKAP";
// });
// filteredCategories();

// var selectedSubCategoryObj = null;
// $("#subcategory1").click(function () {
//   $.getJSON("list.json", function (data) {
//     console.log(data);
//     let output = "";
//     selectedSubCategoryObj = $(this);

//     $.each(data[0].subcategories, function (index, product) {
//       if ($(selectedSubCategoryObj)[0].innerHTML == product.name) {
//         $.each(product.items, function (index, eachItem) {
//           output += `
//           <div class="col-md-3">
//               <div class="items">
//                   <div class='photo'>
//                       <img src="${eachItem.imagelink}">
//                   </div>
//                   <div class="info">
//                       <h4>${eachItem.name}</h4>
//                       <h5>$${eachItem.price}</h5>
//                   </div>
//                   <div class="info">
//                       <p>
//                           <a href="#">Add to cart</a>
//                       </p>
//                   </div>
//               </div>
//           </div>
//        `;
//         });
//         $("#subItems").html(output);
//       }
//     });
//   });
// });