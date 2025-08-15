# VETTAM-AI-APPLICATION

## 📌 Project Overview
**VETTAM-AI-APPLICATION** is a React + TypeScript application designed to provide a high-quality, lawyer-friendly text editing experience using the TipTap library.  
The project consists of two main parts:  

1. **Dynamic Sidebar**  
   - Built with **Zustand** for state management.  
   - Implements **SOLID principles** and follows the **Atomic Design Pattern**.  
   - Highly customizable button-based UI (routing not yet implemented).  

2. **Advanced Text Editor**  
   - Powered by **TipTap**.  
   - Designed for lawyers to create, format, and manage professional documents.  

---

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, CSS  
- **Editor:** TipTap  
- **State Management:** Zustand  
- **Architecture:** Atomic Design Pattern, SOLID Principles  
- **Database:** Local JSON file (for now)  

---

## 📦 Dependencies
Key dependencies used in this project:  
- `@tiptap/core`  
- `@tiptap/react`  
- `@tiptap/starter-kit`  
- `@tiptap/extension-*` (Color, Font Family, Highlight, Link, Subscript, Superscript, Table, Text Align, Text Style, Underline, etc.)  
- `zustand`  
- `typescript`  
- `react`, `react-dom`  
- `webpack`  

For the full list, see the `package.json` file.  

---

## ✨ Features
### Sidebar
- Multiple button options (routing not yet implemented)  
- Dynamic active button state  
- Built with Zustand, SOLID, and Atomic design  

### Text Editor
- **Font Family** (Arial, Georgia, Times New Roman, Courier New)  
- **Font Size** control  
- **Heading Levels** (H1, H2, H3, etc.)  
- **Text Formatting:** Bold, Italic, Underline, Strikethrough  
- **Links**  
- **Text Color & Highlight**  
- **Bullet & Ordered Lists**  
- **Table Support**  
- **Custom Styles** for UI  
- Switch between **Text** and **Page** mode (Page mode in progress)  

---

## 📂 Project Structure
```
src/
  components/       # Atomic design-based components
  store/            # Zustand state management
  TipTapEditor/     # TipTap configuration and extensions
  data/             # Local JSON database
```

---

## 🚀 Setup Instructions
1. Clone this repository  
   ```bash
   git clone https://github.com/shashanksinghsagar/vettam-ai-application.git
   cd vettam-ai-application
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Start the development server  
   ```bash
   npm start
   ```

---

## 📖 Usage
Currently, the main focus is on **Text Editing Mode**.  
1. Start the app.  
2. Use the sidebar to select **Text Mode**.  
3. Apply font styles, colors, highlights, headings, and more.  
4. (Future) Export or save documents.  

---

## 📌 Notes
- **Page Mode** is under development.  
- Routing is not yet implemented.  
- Exporting and database integration features will be added in future releases.  


---

## 📜 License
This project is licensed under the MIT License. You are free to use and modify it.  
