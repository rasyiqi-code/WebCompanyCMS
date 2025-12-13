# 📖 Creating New Hero Components - Developer Guide

Complete guide for developers to create new Hero component variants for the Puck page builder.

---

## 📋 **Prerequisites**

- Understanding of React & TypeScript
- Familiarity with Puck's ComponentConfig API
- Basic knowledge of inline styling (or CSS-in-JS)

---

## 🚀 **Quick Start (5 Steps)**

### **Step 1: Create New Layout File**

Create a new file in `components/puck/Hero/layouts/`:

```bash
# Example: Creating a Restaurant Hero
touch components/puck/Hero/layouts/RestaurantLayout.tsx
```

### **Step 2: Define Props Type**

```tsx
import type { ComponentConfig } from "@measured/puck";

export type HeroRestaurantProps = {
  // Required fields
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  
  // Optional customization fields
  menuImageUrl?: string;
  chefImageUrl?: string;
  backgroundColor?: string;
  accentColor?: string;
  
  // Restaurant-specific
  openingHours?: string;
  reservationPhone?: string;
};
```

### **Step 3: Create Component Config**

```tsx
export const HeroRestaurant: ComponentConfig<HeroRestaurantProps> = {
  label: "Hero - Restaurant", // Sidebar display name
  
  fields: {
    // Define editable fields
    title: { 
      type: "text", 
      label: "📝 Restaurant Name" 
    },
    subtitle: { 
      type: "textarea", 
      label: "📄 Tagline" 
    },
    ctaText: { 
      type: "text", 
      label: "🔘 CTA Button" 
    },
    ctaLink: { 
      type: "text", 
      label: "🔗 CTA Link" 
    },
    menuImageUrl: { 
      type: "text", 
      label: "🍽️ Menu Image URL" 
    },
    chefImageUrl: { 
      type: "text", 
      label: "👨‍🍳 Chef Photo URL" 
    },
    backgroundColor: { 
      type: "text", 
      label: "🎨 Background Color", 
      placeholder: "#1a1a1a" 
    },
    accentColor: { 
      type: "text", 
      label: "✨ Accent Color", 
      placeholder: "#d4af37" 
    },
    openingHours: { 
      type: "text", 
      label: "🕐 Opening Hours", 
      placeholder: "Mon-Sun: 11AM - 11PM" 
    },
    reservationPhone: { 
      type: "text", 
      label: "📞 Reservation Phone" 
    },
  },
  
  defaultProps: {
    title: "Bella Cucina",
    subtitle: "Authentic Italian Dining Experience",
    ctaText: "Book a Table",
    ctaLink: "#reservation",
    backgroundColor: "#1a1a1a",
    accentColor: "#d4af37",
    openingHours: "Mon-Sun: 11AM - 11PM",
  },
  
  render: (props) => (
    // Step 4 - see below
  ),
};
```

### **Step 4: Implement Render Function**

```tsx
render: ({ title, subtitle, ctaText, ctaLink, menuImageUrl, chefImageUrl, backgroundColor, accentColor, openingHours, reservationPhone }) => (
  <section style={{ 
    backgroundColor: backgroundColor || '#1a1a1a', 
    padding: '80px 20px',
    color: 'white' 
  }}>
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center'
    }}>
      {/* Left Content */}
      <div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          marginBottom: '1.5rem',
          color: accentColor || '#d4af37'
        }}>
          {title}
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          {subtitle}
        </p>
        
        {openingHours && (
          <div style={{ 
            fontSize: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🕐 {openingHours}
          </div>
        )}
        
        {reservationPhone && (
          <div style={{ 
            fontSize: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📞 {reservationPhone}
          </div>
        )}
        
        <a 
          href={ctaLink} 
          style={{ 
            display: 'inline-block',
            backgroundColor: accentColor || '#d4af37',
            color: backgroundColor || '#1a1a1a',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'transform 0.2s'
          }}
        >
          {ctaText}
        </a>
      </div>
      
      {/* Right Images */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {menuImageUrl && (
          <div style={{ 
            aspectRatio: '1',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <img 
              src={menuImageUrl} 
              alt="Menu" 
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} 
            />
          </div>
        )}
        
        {chefImageUrl && (
          <div style={{ 
            aspectRatio: '1',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `4px solid ${accentColor || '#d4af37'}`
          }}>
            <img 
              src={chefImageUrl} 
              alt="Chef" 
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} 
            />
          </div>
        )}
        
        {/* Fallback if no images */}
        {!menuImageUrl && !chefImageUrl && (
          <div style={{ 
            gridColumn: '1 / -1',
            aspectRatio: '16/9',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem'
          }}>
            🍽️
          </div>
        )}
      </div>
    </div>
  </section>
),
```

### **Step 5: Register in Puck Config**

#### A. Export from Hero/index.ts

Add to `components/puck/Hero/index.ts`:

```tsx
export { HeroRestaurant, type HeroRestaurantProps } from './layouts/RestaurantLayout';
```

#### B. Import in puck.config.tsx

Add to imports:

```tsx
import {
  // ... existing imports
  HeroRestaurant, type HeroRestaurantProps,
} from "./components/puck";
```

#### C. Add to Props Type

```tsx
type Props = {
  // ... existing types
  HeroRestaurant: HeroRestaurantProps;
};
```

#### D. Register in Config

```tsx
export const config: Config<Props> = {
  categories: {
    "🎬 Hero Sections": {
      components: [
        // ... existing heroes
        "HeroRestaurant", // Add here!
      ],
    },
  },
  components: {
    // ... existing components
    HeroRestaurant, // Add here!
  },
};
```

---

## 🎨 **Design Patterns & Best Practices**

### **1. Responsive Typography**

Use `clamp()` for fluid sizing:

```tsx
fontSize: 'clamp(2rem, 4vw, 3.5rem)' // min, preferred, max
```

### **2. Color Palette**

Always provide fallbacks:

```tsx
backgroundColor: props.backgroundColor || '#1a2332'
color: props.textColor || '#ffffff'
```

### **3. Flexible Layouts**

Use CSS Grid for adaptability:

```tsx
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
gap: '24px'
```

### **4. Image Handling**

Always include fallback placeholders:

```tsx
{imageUrl ? (
  <img src={imageUrl} alt={alt} style={...} />
) : (
  <div style={{ ...fallbackStyles }}>
    {emoji || '📷'}
  </div>
)}
```

### **5. Field Organization**

Group related fields with emoji prefixes:

```tsx
fields: {
  // Content
  title: { type: "text", label: "📝 Title" },
  subtitle: { type: "textarea", label: "📄 Subtitle" },
  
  // Images
  imageUrl: { type: "text", label: "🖼️ Image URL" },
  
  // Styling
  backgroundColor: { type: "text", label: "🎨 BG Color" },
  
  // Actions
  ctaText: { type: "text", label: "🔘 Button Text" },
}
```

---

## 📐 **Common Layouts**

### **Center Layout**

```tsx
<section>
  <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <button>{cta}</button>
  </div>
</section>
```

### **Split Layout (50/50)**

```tsx
<section>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
    <div>{/* Left content */}</div>
    <div>{/* Right content */}</div>
  </div>
</section>
```

### **Full-Width Background**

```tsx
<section style={{ 
  backgroundImage: 'url(...)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  {content}
</section>
```

---

## 🔧 **Advanced Features**

### **Array Fields (Multiple Items)**

For repeating content like features or testimonials:

```tsx
features: {
  type: "array",
  label: "✨ Features",
  arrayFields: {
    icon: { type: "text", label: "Icon (Emoji)" },
    title: { type: "text", label: "Feature Title" },
    description: { type: "textarea", label: "Description" },
  },
  getItemSummary: (item: any) => item.title || "Feature",
},

// In render:
{props.features?.map((feature, i) => (
  <div key={i}>
    <span>{feature.icon}</span>
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </div>
))}
```

### **Conditional Rendering**

Show/hide elements based on props:

```tsx
{props.showStats && (
  <div>
    <StatsComponent stats={props.stats} />
  </div>
)}
```

### **Custom Decorations**

Add visual flair:

```tsx
{/* Decorative blob */}
<div style={{
  position: 'absolute',
  width: '300px',
  height: '300px',
  backgroundColor: accentColor,
  borderRadius: '50% 40% 60% 50%',
  opacity: 0.1,
  top: '-50px',
  right: '-50px',
  zIndex: 0
}} />
```

---

## 🐛 **Troubleshooting**

### **Component Not Showing in Sidebar**

✅ Check:
1. Exported from `Hero/index.ts`?
2. Imported in `puck.config.tsx`?
3. Added to `Props` type?
4. Registered in `categories` AND `components`?
5. Component name matches everywhere?

### **"Cannot read properties of undefined"**

✅ Fix: Ensure `defaultProps` includes all required fields

### **Styling Not Applied**

✅ Remember: Inline styles use camelCase
```tsx
backgroundColor: '#fff' // ✅
background-color: '#fff' // ❌
```

### **TypeScript Errors**

✅ Ensure props type matches fields definition:

```tsx
// Props type
type HeroXProps = {
  title: string; // Required
  subtitle?: string; // Optional
}

// Must have in defaultProps
defaultProps: {
  title: "Default Title", // ✅
  // subtitle is optional, can omit
}
```

---

## 📚 **Examples to Reference**

Study existing components for patterns:

- **Simple:** `PublisherLayout.tsx` - Basic split with wave decoration
- **Image Grid:** `FitnessLayout.tsx` - 4-image grid layout
- **E-commerce:** `FashionLayout.tsx` - Product showcase
- **Feature Cards:** `SecurityLayout.tsx` - Card grid below hero
- **Stats + Avatar:** `WeddingLayout.tsx` - Complex with stats row

---

## ✅ **Checklist**

Before committing your new Hero:

- [ ] TypeScript types defined
- [ ] All fields have emoji labels
- [ ] defaultProps includes all required fields
- [ ] Render function uses inline JSX (no external components)
- [ ] Responsive design (mobile-friendly)
- [ ] Image fallbacks provided
- [ ] Color fallbacks provided
- [ ] Exported from Hero/index.ts
- [ ] Registered in puck.config.tsx (3 places!)
- [ ] Added to "🎬 Hero Sections" category
- [ ] Tested in browser (/edit)
- [ ] Build passes without errors

---

## 🚀 **Next Steps**

After creating your Hero:

1. **Test locally:** `pnpm dev` → visit `/edit`
2. **Add to task.md:** Document the new component
3. **Take screenshot:** Show the design in action
4. **Update walkthrough:** Add to walkthrough.md if significant

---

## 💡 **Pro Tips**

1. **Start from an existing Hero** - Copy similar layout and modify
2. **Use browser DevTools** - Inspect existing Heroes to understand structure
3. **Keep it simple** - Start with basic layout, add features incrementally
4. **Test with real content** - Placeholder text often looks different than real data
5. **Mobile-first** - Test responsive behavior early

---

## 🎓 **Learning Resources**

- [Puck Documentation](https://puck.dev)
- [React Inline Styles](https://react.dev/reference/react-dom/components/common#applying-css-styles)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**Happy coding! 🎉** If you create something awesome, consider sharing it with the team!
