interface FounderItem {
  title: string;
  description: string[];
  image: string;
}

const founderData: FounderItem = {
  title: "Meet Our Visionary Founder",
  description:[
    "As the founder of 11Plus-Success, I am a dedicated tutor with over 20 years of experience in the educational field in the UK and abroad. I specialize in tutoring for the Trafford exams and am fully immersed in the world of everything 11+. Born and bred in the North, my local knowledge and tuition specialism has enabled me to help thousands of students to 11+ success and help parents minimize the risk of ineffective preparation.",
    "I am a professional and caring tutor who is well-regarded in the tuition community across the North-West.  If your work ethic is as big as your dreams, I would love to hear from you and help realize your academic aspirations.",
    "11+ preparation may be one of the biggest investments you make - thank you for visiting and considering 11Plus-Success as your trusted 11+ partner."


  ],
  image:
    "https://vedsadhana.com/wp-content/uploads/2025/01/shana-500.jpg",
} as const;

export default founderData;
