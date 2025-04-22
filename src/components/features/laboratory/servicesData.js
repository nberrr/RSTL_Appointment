export const servicesData = {
  chemical: {
    title: 'Chemical Testing Services',
    description: 'Our chemical laboratory offers comprehensive analytical services for food, water, and environmental samples, providing accurate and reliable results for research and regulatory compliance.',
    categories: [
      {
        name: 'Food Analysis',
        description: 'Comprehensive testing of food samples for various parameters',
        services: [
          { id: 'alcohol', name: 'Alcohol (by volume or ethanol liquor)', price: '₱900.00' },
          { id: 'ash', name: 'Ash', price: '₱500.00' },
          { id: 'brix', name: 'Brix Reading', price: '₱300.00' },
          { id: 'crude-fiber', name: 'Crude Fiber', price: '₱1,380.00' },
          { id: 'dietary-fiber', name: 'Dietary Fiber', price: '₱5,000.00' }
        ]
      },
      {
        name: 'Water and Wastewater',
        description: 'Analysis of water quality and wastewater treatment parameters',
        services: [
          { id: 'water-ph', name: 'pH', price: '₱300.00' },
          { id: 'water-tds', name: 'Total Dissolved Solids', price: '₱500.00' },
          { id: 'water-hardness', name: 'Hardness', price: '₱500.00' },
          { id: 'water-chloride', name: 'Chloride', price: '₱500.00' },
          { id: 'water-sulfate', name: 'Sulfate', price: '₱500.00' }
        ]
      },
      {
        name: 'Plant and Plant Extract',
        description: 'Analysis of plant materials and their extracts',
        services: [
          { id: 'plant-moisture', name: 'Moisture Content', price: '₱500.00' },
          { id: 'plant-ash', name: 'Ash Content', price: '₱500.00' },
          { id: 'plant-fiber', name: 'Fiber Content', price: '₱1,380.00' },
          { id: 'plant-protein', name: 'Protein Content', price: '₱1,500.00' },
          { id: 'plant-fat', name: 'Fat Content', price: '₱1,500.00' }
        ]
      },
      {
        name: 'Packages',
        description: 'Testing services for packaging materials',
        services: [
          { id: 'package-thickness', name: 'Thickness Measurement', price: '₱500.00' },
          { id: 'package-tensile', name: 'Tensile Strength', price: '₱1,500.00' },
          { id: 'package-burst', name: 'Burst Strength', price: '₱1,500.00' },
          { id: 'package-seal', name: 'Seal Strength', price: '₱1,500.00' },
          { id: 'package-migration', name: 'Migration Test', price: '₱2,500.00' }
        ]
      }
    ]
  },
  microbiological: {
    title: 'Food Microbiological Tests',
    description: 'Comprehensive microbiological testing services for food safety and quality assurance.',
    categories: [
      {
        name: 'Food Analysis',
        description: 'Microbiological analysis of food products',
        services: [
          { id: 'food-aerobic', name: 'Aerobic Plate Count', price: '₱550.00' },
          { id: 'food-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
          { id: 'food-coliform', name: 'Coliform Count', price: '₱550.00' },
          { id: 'food-ecoli', name: 'E. coli Count', price: '₱550.00' },
          { id: 'food-staph', name: 'Staphylococcus aureus Count', price: '₱550.00' }
        ]
      },
      {
        name: 'Water and Wastewater',
        description: 'Microbiological analysis of water samples',
        services: [
          { id: 'water-tc', name: 'Total Coliform', price: '₱550.00' },
          { id: 'water-fc', name: 'Fecal Coliform', price: '₱550.00' },
          { id: 'water-ecoli', name: 'E. coli', price: '₱550.00' },
          { id: 'water-hpc', name: 'Heterotrophic Plate Count', price: '₱550.00' }
        ]
      },
      {
        name: 'Plant and Plant Extract',
        description: 'Microbiological analysis of plant materials',
        services: [
          { id: 'plant-tc', name: 'Total Count', price: '₱550.00' },
          { id: 'plant-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
          { id: 'plant-coliform', name: 'Coliform Count', price: '₱550.00' }
        ]
      },
      {
        name: 'Packages',
        description: 'Microbiological testing of packaging materials',
        services: [
          { id: 'package-tc', name: 'Total Count', price: '₱550.00' },
          { id: 'package-yeast', name: 'Yeast and Mold Count', price: '₱550.00' },
          { id: 'package-coliform', name: 'Coliform Count', price: '₱550.00' }
        ]
      },
      {
        name: 'Others',
        description: 'Additional microbiological testing services',
        services: [
          { id: 'other-salmonella', name: 'Salmonella Detection', price: '₱550.00' },
          { id: 'other-listeria', name: 'Listeria Detection', price: '₱550.00' },
          { id: 'other-campylobacter', name: 'Campylobacter Detection', price: '₱550.00' }
        ]
      }
    ]
  },
  shelflife: {
    title: 'Shelf Life Testing',
    description: 'Additional information required',
    categories: [
      {
        name: 'Shelf Life Analysis',
        description: 'Testing services to determine product stability and shelf life',
        services: [
          { 
            id: 'microbiological-analysis', 
            name: 'Microbiological Analysis',
            description: 'Microbial growth during storage period',
            price: '₱2,500.00' 
          },
          { 
            id: 'physiological-analysis', 
            name: 'Physiological Analysis',
            description: 'Physical changes during storage',
            price: '₱2,500.00' 
          },
          { 
            id: 'sensory-analysis', 
            name: 'Sensory Analysis',
            description: 'Taste, texture, appearance changes',
            price: '₱2,500.00' 
          }
        ]
      }
    ]
  }
}; 