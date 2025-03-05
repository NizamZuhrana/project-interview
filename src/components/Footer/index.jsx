export default function Footer() {
    return (
      <footer className="text-gray-300 bg-gray-900">
        <div className="container grid gap-8 px-6 py-10 mx-auto md:grid-cols-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Shopx</h2>
            <p className="mt-2 text-sm">
              Belanja mudah dan nyaman dengan berbagai pilihan produk terbaik untukmu.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400">Information</a></li>
              <li><a href="#" className="hover:text-green-400">Store Locator</a></li>
              <li><a href="#" className="hover:text-green-400">Bulk Purchase</a></li>
              <li><a href="#" className="hover:text-green-400">Alteration Service</a></li>
              <li><a href="#" className="hover:text-green-400">Gift Delivey Service</a></li>
              <li><a href="#" className="hover:text-green-400">LIve Station</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400">FAQ</a></li>
              <li><a href="#" className="hover:text-green-400">Online Shopping Guide</a></li>
              <li><a href="#" className="hover:text-green-400">Return Policy</a></li>
              <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400">Accessibility</a></li>
              <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400">Membership</a></li>
              <li><a href="#" className="hover:text-green-400">Profile</a></li>
              <li><a href="#" className="hover:text-green-400">Coupons</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm">Dapatkan promo menarik langsung di email kamu!</p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm text-gray-800 rounded-l-md focus:outline-none"
              />
              <button className="px-4 py-2 text-white bg-green-600 rounded-r-md hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="grid py-4 text-center border-t border-gray-700 md:grid-cols-2">
          <p className="text-sm">&copy; {new Date().getFullYear()} Shopx. All rights reserved.</p>
          <p className="text-sm">Privacy Policy | Terms & Conditions</p>
        </div>
      </footer>
    );
  }
  