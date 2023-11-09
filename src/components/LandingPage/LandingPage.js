// import React from 'react';
// import NavBar1 from "../NavBar1/NavBar1"
// import "./LandingPage.css"
// const LandingPage = () => {
//     return (
//         <>
//             <div className="landing-page">
//                 <NavBar1 />

//                 <section className="hero">
//                     <h1>MEDI-SCAN</h1>
//                     <p>Medicine is the science[1] and practice[2] of caring for a patient, managing the diagnosis, prognosis, prevention, treatment, palliation of their injury or disease, and promoting their health. Medicine encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illness. Contemporary medicine applies biomedical sciences, biomedical research, genetics, and medical technology to diagnose, treat, and prevent injury and disease, typically through pharmaceuticals or surgery, but also through therapies as diverse as psychotherapy, external splints and traction, medical devices, biologics, and ionizing radiation, amongst others.[3]

//                         Medicine has been practiced since prehistoric times, and for most of this time it was an art (an area of creativity and skill), frequently having connections to the religious and philosophical beliefs of local culture. For example, a medicine man would apply herbs and say prayers for healing, or an ancient philosopher and physician would apply bloodletting according to the theories of humorism. In recent centuries, since the advent of modern science, most medicine has become a combination of art and science (both basic and applied, under the umbrella of medical science). For example, while stitching technique for sutures is an art learned through practice, knowledge of what happens at the cellular and molecular level in the tissues being stitched arises through science.

//                         Prescientific forms of medicine, now known as traditional medicine or folk medicine, remain commonly used in the absence of scientific medicine and are thus called alternative medicine. Alternative treatments outside of scientific medicine with ethical, safety and efficacy concerns are termed quackery.</p> {/* Add your data here */}
//                     <div className="cta-container">
//                         <a href="/login-pat" className="cta-button">
//                             Sign In as a Patient
//                         </a>
//                         <a href="/login-dia" className="cta-button">
//                             Sign In as a Diagnosis Center
//                         </a>
//                     </div>
//                 </section>

//                 <footer className="footer">
//                     <p>&copy; BYTEBOTS </p>
//                 </footer>
//             </div>
//         </>
//     )
// }

// export default LandingPage

import React from 'react'
import Nav from './NavBar/Nav'
import HeroImg from './HeroImg/HeroImg'
const LandingPage = () => {
    return (
        <>
            {/* <Nav /> */}
            <HeroImg />
        </>
    )
}

export default LandingPage