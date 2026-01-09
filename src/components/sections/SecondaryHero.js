import Image from 'next/image';
import { getRecord } from '@/lib/services/collections';
import { getPocketBaseClient } from '@/lib/pocketbase';

/**
 * SecondaryHero Component - MCNAB VENTURES
 * 
 * Hero section that displays content from PocketBase.
 * Supports two design variants:
 * - Default: Full-width image background with overlay text and CTA button
 * - Alternative: Vector design with turquoise curved stripes
 * 
 * @param {Object} props
 * @param {string} props.id - Record ID to fetch from PocketBase collection 'group_hero'
 * @component
 */
export default async function SecondaryHero({ id }) {
  // Fetch data from PocketBase
  const heroData = await getHeroData(id);

  if (!heroData) {
    return null; // Or return a default/fallback component
  }

  const {
    image,
    heading,
    linkLabel,
    linkUrl,
    useVectorDesign = false,
  } = heroData;

  // Render based on design variant
  if (useVectorDesign) {
    return <VectorDesignHero heading={heading} linkLabel={linkLabel} linkUrl={linkUrl} />;
  }

  return <DefaultDesignHero image={image} heading={heading} linkLabel={linkLabel} linkUrl={linkUrl} />;
}

/**
 * Fetch hero data from PocketBase by ID
 * 
 * @param {string} id - The record ID to fetch
 * @returns {Promise<Object|null>} Hero data or null if not found
 */
async function getHeroData(id) {
  try {
    const pb = await getPocketBaseClient();
    
    // Fetch record by ID from group_hero collection
    const result = await pb.collection('group_hero').getOne(id, {
      expand: '',
    });

    // Get image URL if exists
    // PocketBase file URLs format: /api/files/{collectionId}/{recordId}/{filename}
    const imageUrl = result.hero_image 
      ? pb.files.getUrl(result, result.hero_image)
      : null;

    return {
      image: imageUrl,
      heading: result.heading || '',
      linkLabel: result.link_label || '',
      linkUrl: result.link_url || '',
      useVectorDesign: result.use_vector_design || false,
    };
  } catch (error) {
    console.error('Error fetching SecondaryHero data:', error);
    return null;
  }
}

/**
 * Default Design Hero
 * White full-width background with rounded image container
 * Text and button overlay on top-left of the rounded image container
 */
function DefaultDesignHero({ image, heading, linkLabel, linkUrl }) {
  // Aspect ratio: 1348px / 751px ≈ 1.794
  const aspectRatio = 1348 / 751;

  return (
    <section 
      className="relative w-full bg-white py-8 sm:py-12 lg:py-16"
      role="banner"
      aria-label="Hero section"
    >
      {/* Rounded Image Container */}
      {image && (
        <div 
          className="relative w-[90%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg mx-auto"
          style={{
            aspectRatio: aspectRatio,
          }}
        >
          {/* Background Image */}
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="90vw"
          />

          {/* Text and Button Overlay - Top Left */}
          <div className="absolute inset-0 z-10 flex items-start">
            <div className="px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 lg:pt-16 xl:pt-20">
              <div className="max-w-2xl space-y-6 sm:space-y-8">
                {/* Heading */}
                <h1 className="font-literata-light text-white text-[64px] leading-tight">
                  {heading}
                </h1>

                  {/* CTA Button */}
                  {linkLabel && linkUrl && (
                    <div className="pt-2 sm:pt-4">
                      <a
                        href={linkUrl}
                        className="inline-flex items-center gap-3 bg-navy hover:bg-navy/90 text-white font-work-sans-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
                        aria-label={linkLabel}
                      >
                        <span>{linkLabel}</span>
                        <Image
                          src="/btn_arrow.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="flex-shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scroll Indicator - Bottom Center */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <Image
                src="/down_arrow.svg"
                alt="Scroll down"
                width={56}
                height={21}
                className="w-12 sm:w-14 h-auto"
              />
            </div>
          </div>
        )}
    </section>
  );
}

/**
 * Vector Design Hero
 * Alternative design with turquoise curved stripes and dark vertical bar
 */
function VectorDesignHero({ heading, linkLabel, linkUrl }) {
  return (
    <section 
      className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-white"
      role="banner"
      aria-label="Hero section"
    >
      <div className="relative h-full flex items-center">
        {/* Dark Vertical Bar - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-[12%] sm:w-[15%] bg-navy z-10" />

        {/* White Background Area */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 bg-white z-0" />

        {/* Vector SVG - Positioned to create curved stripes effect */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 z-[1] overflow-hidden">
          <div className="relative w-full h-full">
            {/* Vector SVG positioned in the middle-upper section */}
            <div className="absolute top-[35%] left-0 w-full">
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 416 314"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
                style={{ minHeight: '400px' }}
              >
                <path
                  d="M-111 253.115V314C-38.7383 255.985 52.8952 221.238 152.5 221.238C252.105 221.238 343.738 255.999 416 314V253.115C338.81 200.675 247.83 172.47 152.5 172.47C57.1703 172.47 -33.81 200.675 -111 253.115ZM152.5 0C60.154 0 -29.2231 19.4029 -111 56.2164V110.173C-30.0989 70.014 59.5603 48.7675 152.5 48.7675C245.44 48.7675 335.099 70.0289 416 110.173V56.2164C334.223 19.388 244.861 0 152.5 0ZM-111 149.038V205.18C-32.2662 157.558 58.1649 132.118 152.5 132.118C246.835 132.118 337.266 157.558 416 205.18V149.038C335.871 106.114 245.944 83.3359 152.5 83.3359C59.0555 83.3359 -30.8708 106.114 -111 149.038Z"
                  fill="#00BFB3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Blurred Background Image Layer (optional, can be added if provided in PocketBase) */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 z-[2] opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-sand/30 to-navy/10" />
        </div>

        {/* Content - Positioned to the right of the dark bar */}
        <div className="relative z-20 w-full pl-[18%] sm:pl-[20%] pr-4 sm:pr-6 lg:pr-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            <h1 className="font-literata-light text-navy text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {heading}
            </h1>

            {/* CTA Button */}
            {linkLabel && linkUrl && (
              <div className="pt-4">
                <a
                  href={linkUrl}
                  className="inline-flex items-center gap-3 bg-navy hover:bg-navy/90 text-white font-work-sans-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-white rounded"
                  aria-label={linkLabel}
                >
                  <span>{linkLabel}</span>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
