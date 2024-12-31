
document.addEventListener('DOMContentLoaded', () => {
    const facts = [
      "Dogs have an extraordinary sense of smell.",
      "They can understand human emotions and respond to them.",
      "Some breeds, like the Border Collie, are extremely intelligent.",
      "Dogs have been companions to humans for over 15,000 years."
    ];
  
    const breeds = [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Bulldog",
      "Beagle"
    ];
  
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
  
    // Show random fact and breed in console
    console.log("Random Dog Fact: " + randomFact);
    console.log("Random Dog Breed: " + randomBreed);
  });
  