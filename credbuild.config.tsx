import type { Config } from "@credbuild/core";
import {
  HeroPublisher, type HeroPublisherProps,
  HeroPublisherTwo, type HeroPublisherTwoProps,
  HeroFitness, type HeroFitnessProps,
  HeroDental, type HeroDentalProps,
  HeroWedding, type HeroWeddingProps,
  HeroAgency, type HeroAgencyProps,
  HeroYoga, type HeroYogaProps,
  HeroAutoService, type HeroAutoServiceProps,
  HeroSecurity, type HeroSecurityProps,
  HeroMedical, type HeroMedicalProps,
  HeroRealEstate, type HeroRealEstateProps,
  Stats, type StatsProps,
  IconGrid, type IconGridProps,
  Gallery, type GalleryProps,
  Accordion, type AccordionProps,
  Testimonials, type TestimonialsProps,
  CTA, type CTAProps,
  FlexBlock, type FlexBlockProps,
  Container, type ContainerProps,
  PricingSimple as Pricing, type PricingSimpleProps as PricingProps,
  PricingModern, type PricingModernProps,
  PricingBox, type PricingBoxProps,
  PricingGradient, type PricingGradientProps,
  PricingImage, type PricingImageProps,

  BlogList, type BlogListProps,
  AboutCompany, type AboutCompanyProps,
  ProductList, type ProductListProps,
  LogoMarquee, type LogoMarqueeProps,
  ContactForm, type ContactFormProps,
  Portfolio, type PortfolioProps,
  RichText, type RichTextProps
} from "./components/credbuild";

type Props = {
  HeadingBlock: { title: string; font?: string; paddingTop?: number; paddingBottom?: number };
  HeroPublisher: HeroPublisherProps;
  HeroPublisherTwo: HeroPublisherTwoProps;
  HeroFitness: HeroFitnessProps;
  HeroDental: HeroDentalProps;
  HeroWedding: HeroWeddingProps;
  HeroAgency: HeroAgencyProps;
  HeroYoga: HeroYogaProps;
  HeroAutoService: HeroAutoServiceProps;
  HeroSecurity: HeroSecurityProps;
  HeroMedical: HeroMedicalProps;
  HeroRealEstate: HeroRealEstateProps;
  Stats: StatsProps;
  IconGrid: IconGridProps;
  Pricing: PricingProps;
  PricingModern: PricingModernProps;
  PricingBox: PricingBoxProps;
  PricingGradient: PricingGradientProps;
  PricingImage: PricingImageProps;
  BlogList: BlogListProps;
  Gallery: GalleryProps;
  Accordion: AccordionProps;
  Testimonials: TestimonialsProps;
  LogoMarquee: LogoMarqueeProps;
  CTA: CTAProps;
  FlexBlock: FlexBlockProps;
  Container: ContainerProps;
  AboutCompany: AboutCompanyProps;
  ProductList: ProductListProps;
  ContactForm: ContactFormProps;
  Portfolio: PortfolioProps;
  RichText: RichTextProps;
};

export const config: Config<Props> = {
  root: {
    render: ({ children }) => (
      <div>
        {children}
      </div>
    )
  },
  categories: {
    "Hero Sections": {
      components: [
        "HeroPublisher",
        "HeroPublisherTwo",
        "HeroFitness",
        "HeroDental",
        "HeroWedding",
        "HeroAgency",
        "HeroYoga",
        "HeroAutoService",
        "HeroSecurity",
        "HeroMedical",
        "HeroRealEstate",
      ],
    },
    "Content": {
      components: ["Stats", "Testimonials", "LogoMarquee", "Accordion", "IconGrid", "BlogList", "AboutCompany", "Portfolio", "ContactForm"],
    },
    "Marketing": {
      components: ["CTA", "Pricing", "PricingModern", "PricingBox", "PricingGradient", "PricingImage", "Gallery", "ProductList"],
    },
    "Layout": {
      components: ["Container"],
    },
    "Basic": {
      components: ["FlexBlock", "HeadingBlock", "RichText"],
    },
  },
  components: {
    // ... Existing HeadingBlock ...
    HeadingBlock: {
      label: "Heading",
      fields: {
        title: { type: "text" },
        font: {
          type: "select",
          label: "Font",
          options: [
            { label: "Inherit", value: "inherit" },
            { label: "Inter", value: "Inter" },
            { label: "Lato", value: "Lato" },
            { label: "Montserrat", value: "Montserrat" },
            { label: "Playfair Display", value: "Playfair Display" },
            { label: "Roboto", value: "Roboto" },
          ]
        },
        paddingTop: { type: "number", label: "Padding Top" },
        paddingBottom: { type: "number", label: "Padding Bottom" },
      },
      defaultProps: {
        title: "Heading",
        font: "inherit",
        paddingTop: 64,
        paddingBottom: 64,
      },
      render: ({ title, font, paddingTop, paddingBottom }) => (
        <div style={{ padding: 64, paddingTop, paddingBottom }}>
          <h1 style={{ fontFamily: font !== 'inherit' ? `"${font}", sans-serif` : 'inherit' }}>{title}</h1>
        </div>
      ),
    },
    HeroPublisher: { ...HeroPublisher, label: "Book Publisher" },
    HeroPublisherTwo: { ...HeroPublisherTwo, label: "Elite Publisher" },
    HeroFitness: { ...HeroFitness, label: "Fitness & Gym" },
    HeroDental: { ...HeroDental, label: "Dental Clinic" },
    HeroWedding: { ...HeroWedding, label: "Wedding & Events" },
    HeroAgency: { ...HeroAgency, label: "Design Agency" },
    HeroYoga: { ...HeroYoga, label: "Yoga & Wellness" },
    HeroAutoService: { ...HeroAutoService, label: "Auto Service" },
    HeroSecurity: { ...HeroSecurity, label: "Security Tech" },
    HeroMedical: { ...HeroMedical, label: "Medical Health" },
    HeroRealEstate: { ...HeroRealEstate, label: "Real Estate" },
    Stats: { ...Stats, label: "Data Stats" },
    IconGrid: { ...IconGrid, label: "Icon Grid" },
    Pricing: { ...Pricing, label: "Simple Pricing" },
    PricingModern: { ...PricingModern, label: "Modern Pricing" },
    PricingBox: { ...PricingBox, label: "Box Pricing" },
    PricingGradient: { ...PricingGradient, label: "Gradient Pricing" },
    PricingImage: { ...PricingImage, label: "Visual Pricing" },
    BlogList: { ...BlogList, label: "Blog Feed" },
    Gallery: { ...Gallery, label: "Image Gallery" },
    Accordion: { ...Accordion, label: "FAQ Accordion" },
    Testimonials: { ...Testimonials, label: "User Reviews" },
    LogoMarquee: { ...LogoMarquee, label: "Logo Marquee" },
    CTA: { ...CTA, label: "Call to Action" },
    FlexBlock: { ...FlexBlock, label: "Custom Flex" },
    Container: { ...Container, label: "Section Container" },
    AboutCompany: { ...AboutCompany, label: "Company Profile" },
    ProductList: { ...ProductList, label: "Product Showreel" },
    ContactForm: { ...ContactForm, label: "Contact Form" },
    Portfolio: { ...Portfolio, label: "Work Portfolio" },
    RichText: { ...RichText, label: "Rich Text" },
  },
};

export default config;
