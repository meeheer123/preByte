import { FaFacebook, FaTwitter, FaInstagram,FaGithub,FaLinkedin,FaWhatsapp } from 'react-icons/fa';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-4xl font font-bold text-center my-7'>
            About Talentsync
          </h1>
          <div className='text-xl text-600 font-blod flex flex-col gap-6'>
            <p>
            At Talent Sync, we're dedicated to simplifying the hiring process and enhancing visibility for both employers and job seekers. In today's fast-paced world, finding the right talent or the perfect opportunity can be daunting. That's where Talent Sync comes in.
            </p>

            <p>
            Our mission is clear: to revolutionize the hiring experience by providing a seamless platform that connects employers with skilled professionals. We aim to streamline the recruitment process, saving time and resources for businesses while offering unparalleled opportunities for individuals seeking career advancement.
            </p>

            <p>
              Join us :
            </p>
            <div className='flex justify-center items-center gap-4'>
              <a href='#' className='hover:text-red-700'>
                <FaInstagram size={30} />
              </a>
              <a href='#' className='hover:text-blue-700'>
                <FaLinkedin size={30} />
              </a>
              <a href='#' className='hover:text-green-700'>
                <FaWhatsapp size={30} />
              </a>
              <a href='#' className='hover:text-black-700'>
                <FaGithub size={30} />
              </a>
              <a href='#' className='hover:text-blue-600'>
                <FaTwitter size={30} />
              </a>
              <a href='#' className='hover:text-blue-700'>
                <FaFacebook size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
