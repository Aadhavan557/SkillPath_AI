import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RoadmapInput {
  education_level: string;
  branch: string;
  current_skill_level: string;
  target_role: string;
  time_per_day: number;
}

interface Resource {
  type: "video" | "doc" | "article" | "tool";
  title: string;
  url: string;
  description: string;
}

interface Phase {
  title: string;
  duration: string;
  topics: string[];
  resources: Resource[];
  projects: string[];
  checkpoints: string[];
}

function generateRoadmap(input: RoadmapInput): { phases: Phase[]; totalWeeks: number } {
  const { target_role, current_skill_level, time_per_day } = input;

  const phases: Phase[] = [];
  let totalWeeks = 12;

  if (target_role.toLowerCase().includes("web developer") || target_role.toLowerCase().includes("full stack")) {
    phases.push(
      {
        title: "Frontend Fundamentals",
        duration: "3 weeks",
        topics: [
          "HTML5 semantic elements",
          "CSS3 and Flexbox/Grid",
          "JavaScript ES6+ basics",
          "DOM manipulation",
          "Responsive design principles",
          "Browser DevTools"
        ],
        resources: [
          {
            type: "video",
            title: "HTML & CSS Full Course",
            url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
            description: "Complete beginner-friendly HTML and CSS tutorial"
          },
          {
            type: "video",
            title: "JavaScript Full Course",
            url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            description: "Learn JavaScript from scratch"
          },
          {
            type: "doc",
            title: "MDN Web Docs",
            url: "https://developer.mozilla.org/en-US/docs/Web",
            description: "Official web development documentation"
          }
        ],
        projects: [
          "Build a personal portfolio website",
          "Create a responsive landing page",
          "Build a to-do list app with vanilla JavaScript"
        ],
        checkpoints: [
          "Can create semantic HTML structure",
          "Understand CSS positioning and layout",
          "Write basic JavaScript functions",
          "Build responsive layouts"
        ]
      },
      {
        title: "Modern Frontend Framework (React)",
        duration: "4 weeks",
        topics: [
          "React fundamentals and JSX",
          "Components and Props",
          "State and Hooks",
          "React Router",
          "API integration with fetch",
          "State management basics"
        ],
        resources: [
          {
            type: "video",
            title: "React Course for Beginners",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            description: "Complete React tutorial"
          },
          {
            type: "doc",
            title: "React Official Docs",
            url: "https://react.dev/",
            description: "Official React documentation"
          }
        ],
        projects: [
          "Build a weather app with API integration",
          "Create a movie search application",
          "Build a blog with routing"
        ],
        checkpoints: [
          "Understand component lifecycle",
          "Use hooks effectively",
          "Integrate third-party APIs",
          "Implement client-side routing"
        ]
      },
      {
        title: "Backend Development (Node.js)",
        duration: "3 weeks",
        topics: [
          "Node.js fundamentals",
          "Express.js framework",
          "RESTful API design",
          "Database integration (MongoDB/PostgreSQL)",
          "Authentication and JWT",
          "Error handling and validation"
        ],
        resources: [
          {
            type: "video",
            title: "Node.js and Express.js Course",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            description: "Complete backend development tutorial"
          },
          {
            type: "doc",
            title: "Express.js Guide",
            url: "https://expressjs.com/",
            description: "Official Express.js documentation"
          }
        ],
        projects: [
          "Build a REST API for a blog",
          "Create authentication system with JWT",
          "Build a CRUD application with database"
        ],
        checkpoints: [
          "Create RESTful APIs",
          "Implement authentication",
          "Work with databases",
          "Handle errors properly"
        ]
      },
      {
        title: "Full Stack Integration & Deployment",
        duration: "2 weeks",
        topics: [
          "Frontend-Backend integration",
          "Environment variables",
          "Git and GitHub",
          "Deployment (Vercel/Netlify)",
          "Performance optimization",
          "Security best practices"
        ],
        resources: [
          {
            type: "video",
            title: "Git and GitHub Tutorial",
            url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
            description: "Version control fundamentals"
          },
          {
            type: "doc",
            title: "Vercel Deployment Docs",
            url: "https://vercel.com/docs",
            description: "Deploy your applications"
          }
        ],
        projects: [
          "Build and deploy a complete full-stack e-commerce app",
          "Create a social media clone with authentication",
          "Portfolio website with admin panel"
        ],
        checkpoints: [
          "Deploy full-stack applications",
          "Use version control effectively",
          "Implement security measures",
          "Optimize application performance"
        ]
      }
    );
  } else if (target_role.toLowerCase().includes("data analyst") || target_role.toLowerCase().includes("data science")) {
    phases.push(
      {
        title: "Python & Data Fundamentals",
        duration: "3 weeks",
        topics: [
          "Python basics and syntax",
          "Data structures (lists, dictionaries)",
          "NumPy for numerical computing",
          "Pandas for data manipulation",
          "Data cleaning techniques",
          "Basic statistics"
        ],
        resources: [
          {
            type: "video",
            title: "Python for Data Analysis",
            url: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
            description: "Complete Python data analysis tutorial"
          },
          {
            type: "doc",
            title: "Pandas Documentation",
            url: "https://pandas.pydata.org/docs/",
            description: "Official Pandas guide"
          }
        ],
        projects: [
          "Analyze a CSV dataset and create reports",
          "Clean and preprocess real-world messy data",
          "Build a data pipeline"
        ],
        checkpoints: [
          "Write Python code confidently",
          "Manipulate data with Pandas",
          "Clean and prepare datasets",
          "Perform basic statistical analysis"
        ]
      },
      {
        title: "Data Visualization",
        duration: "2 weeks",
        topics: [
          "Matplotlib basics",
          "Seaborn for statistical plots",
          "Interactive visualizations with Plotly",
          "Dashboard creation",
          "Data storytelling",
          "Chart selection best practices"
        ],
        resources: [
          {
            type: "video",
            title: "Data Visualization with Python",
            url: "https://www.youtube.com/watch?v=0P7QnIQDBJY",
            description: "Complete visualization tutorial"
          },
          {
            type: "doc",
            title: "Matplotlib Gallery",
            url: "https://matplotlib.org/stable/gallery/index.html",
            description: "Visualization examples"
          }
        ],
        projects: [
          "Create an interactive sales dashboard",
          "Visualize COVID-19 data trends",
          "Build a business intelligence report"
        ],
        checkpoints: [
          "Create effective visualizations",
          "Choose appropriate chart types",
          "Build interactive dashboards",
          "Tell stories with data"
        ]
      },
      {
        title: "SQL & Database Analysis",
        duration: "3 weeks",
        topics: [
          "SQL fundamentals (SELECT, WHERE, JOIN)",
          "Aggregate functions and GROUP BY",
          "Window functions",
          "Database design basics",
          "Query optimization",
          "Working with multiple tables"
        ],
        resources: [
          {
            type: "video",
            title: "SQL Tutorial for Data Analysis",
            url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            description: "Complete SQL course"
          },
          {
            type: "tool",
            title: "SQLBolt",
            url: "https://sqlbolt.com/",
            description: "Interactive SQL lessons"
          }
        ],
        projects: [
          "Analyze e-commerce database",
          "Create sales reports with complex queries",
          "Build a customer segmentation analysis"
        ],
        checkpoints: [
          "Write complex SQL queries",
          "Join multiple tables",
          "Optimize query performance",
          "Extract business insights"
        ]
      },
      {
        title: "Advanced Analytics & Tools",
        duration: "4 weeks",
        topics: [
          "Excel/Google Sheets advanced features",
          "Business Intelligence tools (Tableau/Power BI)",
          "A/B testing concepts",
          "Regression analysis",
          "Time series analysis",
          "Reporting best practices"
        ],
        resources: [
          {
            type: "video",
            title: "Tableau Full Course",
            url: "https://www.youtube.com/watch?v=aHaOIvR00So",
            description: "Learn Tableau for data visualization"
          },
          {
            type: "video",
            title: "Statistics for Data Science",
            url: "https://www.youtube.com/watch?v=xxpc-HPKN28",
            description: "Statistical concepts"
          }
        ],
        projects: [
          "Create a Tableau dashboard for business metrics",
          "Perform A/B test analysis",
          "Build a predictive model for sales forecasting"
        ],
        checkpoints: [
          "Use BI tools effectively",
          "Perform statistical analysis",
          "Present findings to stakeholders",
          "Make data-driven recommendations"
        ]
      }
    );
  } else if (target_role.toLowerCase().includes("embedded") || target_role.toLowerCase().includes("iot")) {
    phases.push(
      {
        title: "C Programming & Electronics Basics",
        duration: "4 weeks",
        topics: [
          "C programming fundamentals",
          "Pointers and memory management",
          "Data structures in C",
          "Digital electronics basics",
          "Microcontroller architecture",
          "Binary and hexadecimal systems"
        ],
        resources: [
          {
            type: "video",
            title: "C Programming Full Course",
            url: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
            description: "Complete C programming tutorial"
          },
          {
            type: "video",
            title: "Digital Electronics",
            url: "https://www.youtube.com/watch?v=M0mx8S05v60",
            description: "Electronics fundamentals"
          }
        ],
        projects: [
          "Build a calculator in C",
          "Implement data structures (linked list, stack)",
          "Create a simple file system"
        ],
        checkpoints: [
          "Write efficient C code",
          "Understand memory management",
          "Work with pointers",
          "Understand digital logic"
        ]
      },
      {
        title: "Microcontroller Programming (Arduino)",
        duration: "3 weeks",
        topics: [
          "Arduino IDE and basics",
          "Digital I/O operations",
          "Analog inputs and PWM",
          "Serial communication",
          "Sensor interfacing",
          "Actuator control"
        ],
        resources: [
          {
            type: "video",
            title: "Arduino Tutorial for Beginners",
            url: "https://www.youtube.com/watch?v=zJ-LqeX_fLU",
            description: "Complete Arduino course"
          },
          {
            type: "doc",
            title: "Arduino Documentation",
            url: "https://docs.arduino.cc/",
            description: "Official Arduino docs"
          }
        ],
        projects: [
          "LED control and pattern generation",
          "Temperature monitoring system",
          "Ultrasonic distance sensor project"
        ],
        checkpoints: [
          "Program Arduino boards",
          "Interface sensors and actuators",
          "Implement serial communication",
          "Debug embedded systems"
        ]
      },
      {
        title: "Advanced Embedded Systems",
        duration: "4 weeks",
        topics: [
          "ARM Cortex-M architecture",
          "Real-time operating systems (RTOS)",
          "Communication protocols (I2C, SPI, UART)",
          "Interrupt handling",
          "Power management",
          "Hardware debugging"
        ],
        resources: [
          {
            type: "video",
            title: "Embedded Systems Course",
            url: "https://www.youtube.com/watch?v=R0eL4p9YeL0",
            description: "Advanced embedded programming"
          },
          {
            type: "doc",
            title: "STM32 Documentation",
            url: "https://www.st.com/content/st_com/en.html",
            description: "STM32 resources"
          }
        ],
        projects: [
          "Build an RTOS-based multi-tasking system",
          "Create an IoT device with WiFi connectivity",
          "Develop a motor control system"
        ],
        checkpoints: [
          "Work with RTOS",
          "Implement communication protocols",
          "Handle interrupts properly",
          "Optimize power consumption"
        ]
      },
      {
        title: "IoT & Real-World Projects",
        duration: "3 weeks",
        topics: [
          "IoT architecture",
          "MQTT protocol",
          "Cloud integration (AWS IoT, ThingSpeak)",
          "PCB design basics",
          "Testing and debugging",
          "Industry standards"
        ],
        resources: [
          {
            type: "video",
            title: "IoT Full Course",
            url: "https://www.youtube.com/watch?v=LlhmzVL5bm8",
            description: "Complete IoT tutorial"
          },
          {
            type: "tool",
            title: "KiCad",
            url: "https://www.kicad.org/",
            description: "Free PCB design software"
          }
        ],
        projects: [
          "Build a smart home automation system",
          "Create a weather monitoring IoT device",
          "Develop a fitness tracker prototype"
        ],
        checkpoints: [
          "Design IoT systems",
          "Integrate cloud services",
          "Design basic PCBs",
          "Test embedded systems"
        ]
      }
    );
  } else {
    phases.push(
      {
        title: "Foundation Phase",
        duration: "3 weeks",
        topics: [
          "Industry overview and career paths",
          "Core technical concepts",
          "Problem-solving fundamentals",
          "Communication skills",
          "Time management",
          "Learning strategies"
        ],
        resources: [
          {
            type: "video",
            title: "Career Path Guide",
            url: "https://www.youtube.com/results?search_query=career+path+" + target_role,
            description: "Explore career opportunities"
          },
          {
            type: "article",
            title: "Industry Insights",
            url: "https://www.google.com/search?q=" + encodeURIComponent(target_role),
            description: "Learn about the field"
          }
        ],
        projects: [
          "Research and document career requirements",
          "Create a learning journal",
          "Network with professionals in the field"
        ],
        checkpoints: [
          "Understand career requirements",
          "Identify key skills needed",
          "Create a learning plan",
          "Set clear goals"
        ]
      },
      {
        title: "Core Skills Development",
        duration: "4 weeks",
        topics: [
          "Essential technical skills",
          "Tools and technologies",
          "Best practices",
          "Industry standards",
          "Collaboration skills",
          "Documentation"
        ],
        resources: [
          {
            type: "video",
            title: "Skill Development Resources",
            url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(target_role + " tutorial"),
            description: "Learn core skills"
          },
          {
            type: "doc",
            title: "Online Documentation",
            url: "https://www.google.com/search?q=" + encodeURIComponent(target_role + " documentation"),
            description: "Reference materials"
          }
        ],
        projects: [
          "Build practical projects related to your role",
          "Contribute to open-source projects",
          "Create a portfolio"
        ],
        checkpoints: [
          "Master fundamental concepts",
          "Use industry-standard tools",
          "Follow best practices",
          "Build practical projects"
        ]
      },
      {
        title: "Advanced Topics & Specialization",
        duration: "3 weeks",
        topics: [
          "Advanced concepts",
          "Specialized skills",
          "Performance optimization",
          "Security considerations",
          "Scalability",
          "Testing and quality assurance"
        ],
        resources: [
          {
            type: "video",
            title: "Advanced Topics",
            url: "https://www.youtube.com/results?search_query=advanced+" + encodeURIComponent(target_role),
            description: "Deep dive into advanced concepts"
          }
        ],
        projects: [
          "Build a complex, production-ready project",
          "Optimize existing projects",
          "Solve real-world problems"
        ],
        checkpoints: [
          "Handle complex scenarios",
          "Optimize performance",
          "Implement security measures",
          "Write quality code"
        ]
      },
      {
        title: "Career Preparation & Job Readiness",
        duration: "2 weeks",
        topics: [
          "Resume building",
          "Interview preparation",
          "Portfolio development",
          "Networking strategies",
          "Technical interview practice",
          "Soft skills development"
        ],
        resources: [
          {
            type: "article",
            title: "Interview Preparation Guide",
            url: "https://www.google.com/search?q=" + encodeURIComponent(target_role + " interview preparation"),
            description: "Ace your interviews"
          }
        ],
        projects: [
          "Polish your portfolio",
          "Practice mock interviews",
          "Contribute to the community"
        ],
        checkpoints: [
          "Have a strong portfolio",
          "Prepare for interviews",
          "Network effectively",
          "Apply for positions confidently"
        ]
      }
    );
  }

  if (current_skill_level === "intermediate") {
    phases.shift();
    totalWeeks = Math.max(8, totalWeeks - 3);
  } else if (current_skill_level === "advanced") {
    phases.shift();
    if (phases.length > 2) phases.shift();
    totalWeeks = Math.max(6, totalWeeks - 6);
  }

  if (time_per_day >= 4) {
    totalWeeks = Math.ceil(totalWeeks * 0.75);
  } else if (time_per_day <= 1) {
    totalWeeks = Math.ceil(totalWeeks * 1.5);
  }

  return { phases, totalWeeks };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const input: RoadmapInput = await req.json();
    const roadmap = generateRoadmap(input);

    return new Response(JSON.stringify(roadmap), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
