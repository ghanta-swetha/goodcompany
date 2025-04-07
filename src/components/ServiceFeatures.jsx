const ServiceFeatures = () => {
    const features = [
      {
        icon: "fa-truck-fast",
        title: "Free Shipping",
        description: "Free shipping only in TG & AP, charges applicable for other states",
      },
      {
        icon: "fa-rotate-left",
        title: "Money Back Guarantee",
        description: "Full refund for damaged items with proof and return of the full product",
      },
      {
        icon: "fa-headset",
        title: "24/7 Customer Support",
        description: "Friendly 24/7 customer support",
      },
      {
        icon: "fa-credit-card",
        title: "Secure Online Payment",
        description: "We possess SSL / Secure Certificate",
      },
    ]
  
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-primary text-3xl">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default ServiceFeatures
  
  