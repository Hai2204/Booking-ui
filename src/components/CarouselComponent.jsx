import { Carousel, Image } from 'antd';

// Dữ liệu mẫu chứa các URL ảnh
const imageData = [
  {
    id: 1,
    url: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-83.jpg',
    alt: 'Sunset View',
  },
  {
    id: 2,
    url: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-83.jpg',
    alt: 'Beach View',
  },
  {
    id: 3,
    url: '#000000',
    alt: 'City Night',
  },
  {
    id: 4,
    url: '#000000',
    alt: 'Mountain Hike',
  },
];

const CarouselComponent = () => {
  // Cấu hình Ant Design Carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 10000,
    autoplay: { dotDuration: true }, // Tự động chuyển slide
  };

  return (
    <Carousel {...settings}>
      {imageData.map(image => (
        <div key={image.id} >
          <Image
            width="100%"
            height={600}
            src={image.url}
            alt={image.alt}
            style={{ objectFit: 'cover' }}
            preview={false}
            className='parallax-container'
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
