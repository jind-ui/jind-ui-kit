import { Carousel, Card, Heading, Text } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'children', type: 'ReactNode', description: 'Slide content elements' },
  { name: 'autoPlay', type: 'boolean', description: 'Auto-advance slides (default: false)' },
  { name: 'interval', type: 'number', description: 'Auto-play interval in ms (default: 4000)' },
  { name: 'showDots', type: 'boolean', description: 'Show dot indicators (default: true)' },
  { name: 'showArrows', type: 'boolean', description: 'Show prev/next arrows (default: true)' },
  { name: 'loop', type: 'boolean', description: 'Loop back to start (default: false)' },
  { name: 'slidesToShow', type: 'number', description: 'Visible slides at once (default: 1)' },
  { name: 'gap', type: 'number', description: 'Gap between slides in px (default: 16)' },
];

const slideColors = ['#e8f4fd', '#fde8e8', '#e8fde8', '#fdf5e8', '#f0e8fd'];

export function ComponentCarousel() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="carousel" />
        <h1 className="page-title">Carousel</h1>
        <p className="page-description">
          Horizontal content slider with navigation arrows, dot indicators,
          auto-play, and multi-slide display.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          align="column"
          code={`<Carousel>
  <Card style={{ padding: 40, textAlign: 'center' }}>Slide 1</Card>
  <Card style={{ padding: 40, textAlign: 'center' }}>Slide 2</Card>
  <Card style={{ padding: 40, textAlign: 'center' }}>Slide 3</Card>
</Carousel>`}
        >
          <div style={{ width: '100%' }}>
            <Carousel>
              {slideColors.map((bg, i) => (
                <Card key={i} style={{ padding: 40, textAlign: 'center', backgroundColor: bg }}>
                  <Heading level={3}>{`Slide ${i + 1}`}</Heading>
                  <Text style={{ marginTop: 8 }}>Content for slide {i + 1}</Text>
                </Card>
              ))}
            </Carousel>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Multiple Slides</h2>
        <Preview
          align="column"
          code={`<Carousel slidesToShow={3} gap={12}>
  {items.map(item => <Card>...</Card>)}
</Carousel>`}
        >
          <div style={{ width: '100%' }}>
            <Carousel slidesToShow={3} gap={12}>
              {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((name, i) => (
                <Card key={i} style={{ padding: 24, textAlign: 'center', backgroundColor: slideColors[i] }}>
                  <Text style={{ fontWeight: 600 }}>{name}</Text>
                </Card>
              ))}
            </Carousel>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Auto-Play with Loop</h2>
        <Preview
          align="column"
          code={`<Carousel autoPlay interval={3000} loop>
  ...slides
</Carousel>`}
        >
          <div style={{ width: '100%' }}>
            <Carousel autoPlay interval={3000} loop>
              {slideColors.slice(0, 3).map((bg, i) => (
                <Card key={i} style={{ padding: 40, textAlign: 'center', backgroundColor: bg }}>
                  <Heading level={3}>{`Auto Slide ${i + 1}`}</Heading>
                </Card>
              ))}
            </Carousel>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
