import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
const Features = () => {
    return (
      <div className="flex flex-col min-h-screen">
          <Nav />
              <div className="container mx-auto px-6 mt-10 mb-20 flex-grow">
                <h2 className="text-3xl font-bold text-center mb-8">
                   Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Transparency Feature */}
                  <div className="feature-card bg-green-50 p-4 rounded-lg shadow-md">
                    {/* <img
                src={transparency}
                alt="Transparency"
                className="w-12 h-12 mb-2"
              /> */}
                    <h3 className="text-2xl font-semibold mb-2">Transparency</h3>
                    <p className="text-lg">
                      Blockchain ensures a transparent supply chain by recording every
                      transaction on an immutable ledger, accessible to all
                      stakeholders.
                    </p>
                  </div>

                  {/* Security Feature */}
                  <div className="feature-card bg-green-50 p-4 rounded-lg shadow-md">
                    {/* <img
                src={security}
                alt="Security"
                className="w-12 h-12 mb-2"
              /> */}
                    <h3 className="text-2xl font-semibold mb-2">Enhanced Security</h3>
                    <p className="text-lg">
                      All transactions are encrypted and verified, providing a secure
                      environment free from tampering and fraud.
                    </p>
                  </div>

                  {/* Decentralization Feature */}
                  <div className="feature-card bg-green-50 p-4 rounded-lg shadow-md">
                    {/* <img
                src={decentralization}
                alt="Decentralization"
                className="w-12 h-12 mb-2"
              /> */}
                    <h3 className="text-2xl font-semibold mb-2">Decentralization</h3>
                    <p className="text-lg">
                      The decentralized nature of blockchain eliminates the need for
                      intermediaries, reducing costs and increasing efficiency.
                    </p>
                  </div>
                </div>
              </div>
        <Footer  />
</div>
    );
  };
  
  export default Features;
