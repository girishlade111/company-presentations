// This file simulates fetching data from an API
// In a real application, this would be replaced with actual API calls

// KPI Data
export async function fetchKpiData(dateRange?: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use the dateRange to filter data
  // For this example, we'll just return the same data

  return {
    vibrix: {
      occupancy: 90,
      b2cProjects: 10,
      b2bProjects: 5,
      projectArea: 4410,
      mainFocus: [
        "VIBRIX CRM with Nicky",
        "VIBRIX planning",
        "Meeting workers",
        "Price list",
        "Workers salaries (ViFin)",
        "Operational matters – Revolute, etc.",
      ],
    },
    vipro: {
      currentProjects: 3,
      projectArea: 12222,
      completionRate: 72,
      timeEfficiency: 95,
      weeklyFocus: [
        "Arcadia – Commence. VibrixLLI.",
        "Vigarden & Yaneva – contracts.",
        "360 Sales products & strategy",
      ],
    },
    vifix: {
      managedUnits: {
        internal: 15,
        external: 11,
      },
      clients: {
        internal: 6,
        external: 6,
      },
      tickets: {
        internal: 1,
        external: 5,
      },
      timeEfficiency: 95,
      done: ["Rents collection", "Dashboards/Presentations", "Contracts", "Insurance claim", "Time management"],
      todo: ["Financial model", "Pricing of services", "Insurance claim", "VIFIX Company", "Networking"],
    },
    videsign: {
      architecture: 19800,
      interior: 1780,
      done: ["Labor contracts", "Reports events", "Gross view Dashboards"],
      todo: ["Business plan", "Pricing Architecture to VIG", "Gross view Dashboard"],
    },
  }
}

// Projects Data
export async function fetchProjectsData(dateRange?: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use the dateRange to filter data

  return {
    totalProjects: 15,
    projectsChange: 3,
    projects: [
      {
        id: "1",
        name: "Re137_Stoyan",
        actual: 100,
        planned: 100,
        startDate: "12.03.2025",
        endDate: "28.04.2025",
        type: "B2C",
      },
      {
        id: "2",
        name: "Re131_Eduard",
        actual: 100,
        planned: 100,
        startDate: "15.02.2025",
        endDate: "07.05.2025",
        type: "B2C",
      },
      {
        id: "3",
        name: "Re150_Preya",
        actual: 70,
        planned: 99,
        startDate: "01.03.2025",
        endDate: "23.05.2025",
        type: "B2C",
      },
      {
        id: "4",
        name: "Re161_Borimir",
        actual: 40,
        planned: 90,
        startDate: "15.03.2025",
        endDate: "30.06.2025",
        type: "B2C",
      },
      {
        id: "5",
        name: "FM028_Flip15",
        actual: 100,
        planned: 100,
        startDate: "10.01.2025",
        endDate: "30.05.2025",
        type: "B2B",
      },
    ],
    vibrixProjects: [
      {
        id: "1",
        name: "Re137_Stoyan",
        actual: 100,
        planned: 100,
        startDate: "12.03.2025",
        endDate: "28.04.2025",
        type: "B2C",
      },
      {
        id: "2",
        name: "Re131_Eduard",
        actual: 100,
        planned: 100,
        startDate: "15.02.2025",
        endDate: "07.05.2025",
        type: "B2C",
      },
      {
        id: "3",
        name: "Re150_Preya",
        actual: 70,
        planned: 99,
        startDate: "01.03.2025",
        endDate: "23.05.2025",
        type: "B2C",
      },
      {
        id: "4",
        name: "Re161_Borimir",
        actual: 40,
        planned: 90,
        startDate: "15.03.2025",
        endDate: "30.06.2025",
        type: "B2C",
      },
      {
        id: "5",
        name: "FM028_Flip15",
        actual: 100,
        planned: 100,
        startDate: "10.01.2025",
        endDate: "30.05.2025",
        type: "B2B",
      },
    ],
    viproProjects: [
      {
        id: "1",
        name: "ARCADIA",
        targetEndDate: "Dec 2026",
        phases: {
          p1: { planned: 5, actual: 5 },
          p2: { planned: 20, actual: 20 },
          p3: { planned: 10, actual: 6 },
          p4: { planned: 65, actual: 41 },
        },
      },
      {
        id: "2",
        name: "VIGARDEN",
        targetEndDate: "Nov 2025",
        phases: {
          p1: { planned: 20, actual: 15 },
          p2: { planned: 10, actual: 5 },
          p3: { planned: 20, actual: 0 },
          p4: { planned: 50, actual: 0 },
        },
      },
      {
        id: "3",
        name: "YANEVA's HOUSE",
        targetEndDate: "Feb 2027",
        phases: {
          p1: { planned: 5, actual: 5 },
          p2: { planned: 20, actual: 5 },
          p3: { planned: 10, actual: 5 },
          p4: { planned: 65, actual: 0 },
        },
      },
    ],
  }
}

// Financial Data
export async function fetchFinancialData(dateRange?: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use the dateRange to filter data

  return {
    totalRevenue: 927000,
    revenueChange: 15,
    totalArea: 22580,
    areaChange: 8,
    revenueTrend: [
      { month: "Jan", actual: 80000, planned: 75000, target: 70000 },
      { month: "Feb", actual: 85000, planned: 80000, target: 75000 },
      { month: "Mar", actual: 90000, planned: 85000, target: 80000 },
      { month: "Apr", actual: 95000, planned: 90000, target: 85000 },
      { month: "May", actual: 100000, planned: 95000, target: 90000 },
    ],
    vibrix: {
      revenue: 520000,
      profit: 156000,
      target: 550000,
      revenueTrend: [
        { month: "Jan", actual: 90000, planned: 85000, target: 95000 },
        { month: "Feb", actual: 95000, planned: 90000, target: 100000 },
        { month: "Mar", actual: 105000, planned: 100000, target: 110000 },
        { month: "Apr", actual: 110000, planned: 105000, target: 115000 },
        { month: "May", actual: 120000, planned: 115000, target: 130000 },
      ],
      profitTrend: [
        { month: "Jan", actual: 27000, planned: 25500, target: 28500 },
        { month: "Feb", actual: 28500, planned: 27000, target: 30000 },
        { month: "Mar", actual: 31500, planned: 30000, target: 33000 },
        { month: "Apr", actual: 33000, planned: 31500, target: 34500 },
        { month: "May", actual: 36000, planned: 34500, target: 39000 },
      ],
    },
    vipro: {
      revenue: 350000,
      profit: 105000,
      target: 380000,
      revenueTrend: [
        { month: "Jan", actual: 60000, planned: 65000, target: 70000 },
        { month: "Feb", actual: 65000, planned: 70000, target: 75000 },
        { month: "Mar", actual: 70000, planned: 75000, target: 80000 },
        { month: "Apr", actual: 75000, planned: 80000, target: 85000 },
        { month: "May", actual: 80000, planned: 85000, target: 90000 },
      ],
      profitTrend: [
        { month: "Jan", actual: 18000, planned: 19500, target: 21000 },
        { month: "Feb", actual: 19500, planned: 21000, target: 22500 },
        { month: "Mar", actual: 21000, planned: 22500, target: 24000 },
        { month: "Apr", actual: 22500, planned: 24000, target: 25500 },
        { month: "May", actual: 24000, planned: 25500, target: 27000 },
      ],
    },
    vifix: {
      revenue: 126000,
      profit: 37800,
      target: 140000,
      revenueTrend: [
        { month: "Jan", actual: 20000, planned: 22000, target: 25000 },
        { month: "Feb", actual: 22000, planned: 24000, target: 27000 },
        { month: "Mar", actual: 25000, planned: 26000, target: 28000 },
        { month: "Apr", actual: 28000, planned: 29000, target: 30000 },
        { month: "May", actual: 31000, planned: 32000, target: 33000 },
      ],
      profitTrend: [
        { month: "Jan", actual: 6000, planned: 6600, target: 7500 },
        { month: "Feb", actual: 6600, planned: 7200, target: 8100 },
        { month: "Mar", actual: 7500, planned: 7800, target: 8400 },
        { month: "Apr", actual: 8400, planned: 8700, target: 9000 },
        { month: "May", actual: 9300, planned: 9600, target: 9900 },
      ],
    },
    videsign: {
      revenue: 451000,
      profit: 129000,
      target: 480000,
      revenueTrend: [
        { month: "Jan", actual: 80000, planned: 75000, target: 70000 },
        { month: "Feb", actual: 85000, planned: 80000, target: 75000 },
        { month: "Mar", actual: 90000, planned: 85000, target: 80000 },
        { month: "Apr", actual: 95000, planned: 90000, target: 85000 },
        { month: "May", actual: 100000, planned: 95000, target: 90000 },
      ],
      profitTrend: [
        { month: "Jan", actual: 20000, planned: 18000, target: 17000 },
        { month: "Feb", actual: 22000, planned: 20000, target: 19000 },
        { month: "Mar", actual: 25000, planned: 22000, target: 21000 },
        { month: "Apr", actual: 28000, planned: 25000, target: 23000 },
        { month: "May", actual: 30000, planned: 28000, target: 25000 },
      ],
    },
  }
}

// Clients Data
export async function fetchClientsData(dateRange?: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use the dateRange to filter data

  return {
    totalClients: 22,
    clientsChange: 5,
    b2bCount: 5,
    b2cCount: 17,
    futureRevenue: 927000,
    consideringRevenue: 352000,
    b2bFutureRevenue: 662000,
    b2cFutureRevenue: 265000,
    b2bConsideringRevenue: 3500000,
    b2cConsideringRevenue: 352000,
    futureClients: [
      {
        id: "1",
        name: "Ru House",
        sqm: 200,
        company: "VIBRIX",
        budget: 120000,
        startDate: "28/05/2024",
        type: "B2C",
      },
      {
        id: "2",
        name: "Iliyan Stoyanov",
        sqm: 45,
        company: "VIBRIX",
        budget: 20000,
        startDate: "12/05/2025",
        type: "B2C",
      },
      {
        id: "3",
        name: "Vadim Yosifov",
        sqm: 120,
        company: "VIBRIX",
        budget: 75000,
        startDate: "22/04/2025",
        type: "B2C",
      },
      {
        id: "4",
        name: "Nikolay Aladzov",
        sqm: 350,
        company: "VIDESIGN/VIBRIX",
        budget: 50000,
        startDate: "10/05/2025",
        type: "B2C",
      },
      {
        id: "5",
        name: "First Plovdiv",
        sqm: 450,
        company: "VIBRIX",
        budget: 600000,
        startDate: "16/06/2025",
        type: "B2B",
      },
      {
        id: "6",
        name: "Arcadia",
        sqm: 1650,
        company: "VIBRIX",
        budget: 65000,
        startDate: "15/05/2024",
        type: "B2B",
      },
      {
        id: "7",
        name: "Contract city",
        sqm: 45,
        company: "VIBRIX",
        budget: 12000,
        startDate: "28/04/2025",
        type: "B2B",
      },
    ],
    consideringClients: [
      {
        id: "1",
        name: "Aleksandra Zlateva",
        sqm: 90,
        company: "VIDESIGN/VIBRIX",
        budget: 50000,
        meetingDate: "16/05/2025",
        status: "Visitation",
        type: "B2C",
      },
      {
        id: "2",
        name: "Nikola Nikolov",
        sqm: 200,
        company: "VIBRIX",
        budget: 120000,
        meetingDate: "15/05/2025",
        status: "Visitation",
        type: "B2C",
      },
      {
        id: "3",
        name: "Dimitar Dimov",
        sqm: 75,
        company: "VIDESIGN/VIBRIX",
        budget: 45000,
        meetingDate: "01/05/2025",
        status: "BOQ",
        type: "B2C",
      },
      {
        id: "4",
        name: "Meytal",
        sqm: 35,
        company: "VIBRIX",
        budget: 15000,
        meetingDate: "01/06/2025",
        status: "Offer",
        type: "B2C",
      },
      {
        id: "5",
        name: "Lozen",
        sqm: 6000,
        company: "Hydroisomat",
        budget: 1750000,
        meetingDate: "15/05/2026",
        status: "Meeting",
        type: "B2B",
      },
      {
        id: "6",
        name: "Pharmacy",
        sqm: 10000,
        company: "Hydroisomat",
        budget: 1750000,
        meetingDate: "10/05/2025",
        status: "Meeting",
        type: "B2B",
      },
    ],
  }
}

// Time Management Data
export async function fetchTimeManagementData(dateRange?: { from: Date; to: Date }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would use the dateRange to filter data

  return {
    timeAllocation: [
      { name: "Admin", value: 5, color: "#4f46e5" },
      { name: "Core", value: 65, color: "#06b6d4" },
      { name: "Development", value: 30, color: "#f59e0b" },
    ],
    vibrix: {
      admin: 5,
      core: 65,
      dev: 30,
    },
    vipro: {
      admin: 5,
      core: 65,
      dev: 30,
    },
    vifix: {
      operational: 45,
      admin: 50,
      dev: 5,
    },
    videsign: {
      admin: 5,
      core: 65,
      dev: 30,
    },
  }
}
