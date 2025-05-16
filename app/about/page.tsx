export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50 dark:bg-neutral-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        About RevoShop
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center leading-relaxed">
        Welcome to <span className="font-semibold">RevoShop</span>, your one-stop shop for all things electric and acoustic guitars. 
        This project is built using the latest technologies, including <span className="font-semibold">Next.js 13</span>, 
        <span className="font-semibold">TypeScript</span>, and <span className="font-semibold">Tailwind CSS</span>. 
        It demonstrates modern e-commerce functionality, including a dynamic product catalog, a shopping cart, and a responsive design.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center leading-relaxed mt-4">
        The project is designed to showcase server-side rendering (SSR), static site generation (SSG), and client-side interactivity. 
        It also includes features like theme toggling, a cart sidebar, and dynamic routing for product details.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center leading-relaxed mt-4">
        Whether you are a developer looking to learn modern web development or a guitar enthusiast exploring our catalog, 
        we hope you enjoy your experience with RevoShop!
      </p>
    </div>
  );
}