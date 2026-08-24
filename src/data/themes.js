// Cross-cutting vocabulary themes — a topic tag that cuts ACROSS units
// (unlike `unit`, which is the book's own unit/chapter). A card can carry
// 1-2 theme keys (see `themes` on Vocabulary cards in
// src/data/levels/pre-intermediate.js). Themes let you study/browse "all
// money-related vocabulary" or "everything about travel", pulling cards
// from several different units at once. Grammar cards aren't themed —
// they use `prereq` instead (see ThemeScreen.jsx vs. the prereq badge in
// app.jsx's flashcard back).
const THEMES = [
  { key: "work-career", label: "Work & Career" },
  { key: "money-finance", label: "Money & Finance" },
  { key: "shopping-consumer", label: "Shopping" },
  { key: "travel-transport", label: "Travel & Transport" },
  { key: "food-dining", label: "Food & Dining" },
  { key: "sports-fitness", label: "Sports & Fitness" },
  { key: "family-relationships", label: "Family & Relationships" },
  { key: "home-housing", label: "Home & Housing" },
  { key: "education-learning", label: "Education & Learning" },
  { key: "health-body", label: "Health & Body" },
  { key: "communication-technology", label: "Communication & Tech" },
  { key: "science-environment", label: "Science & Environment" },
  { key: "entertainment-media", label: "Entertainment & Media" },
  { key: "social-events", label: "Social Events" },
];
