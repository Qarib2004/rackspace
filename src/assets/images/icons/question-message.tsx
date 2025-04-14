import { useState } from 'react';

const QuestionMessage = () => {
  const [hovered, setHovered] = useState(false);

  const fill = hovered ? '#a84300' : '#d36728'; // ← normal and hover colors

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21.146"
        height="21.131"
        viewBox="0 0 21.146 21.131"
        style={{ transition: 'fill 0.3s ease' }}
      >
        <g transform="translate(-907.542 -319.614)">
          <g transform="translate(907.542 319.614)">
            <path
              d="M16.376,1.883A10.58,10.58,0,0,0,0,10.721a10.353,10.353,0,0,0,1.749,5.77L.041,20.583a.512.512,0,0,0,.665.665L4.8,19.54A10.557,10.557,0,1,0,16.376,1.883ZM10.588,20.266h-.01v.01h0a9.637,9.637,0,0,1-5.432-1.729.512.512,0,0,0-.286-.092.5.5,0,0,0-.194,0l-3.2,1.371L2.8,16.634a.511.511,0,0,0-.051-.491,9.34,9.34,0,0,1-1.729-5.422,9.555,9.555,0,1,1,9.565,9.545Z"
              transform="translate(0 -0.154)"
              fill={fill}
            />
          </g>
          <g transform="translate(914.907 324.636)">
            <path
              d="M160.07,107.657a3.253,3.253,0,0,0-6.47.407.512.512,0,0,0,1.023,0,2.189,2.189,0,1,1,2.189,2.23.512.512,0,0,0-.512.512V113.1a.512.512,0,1,0,1.023,0v-1.821A3.212,3.212,0,0,0,160.07,107.657Z"
              transform="translate(-153.6 -104.882)"
              fill={fill}
            />
          </g>
          <g transform="translate(917.518 334.639)">
            <circle cx="0.56" cy="0.56" r="0.56" fill={fill} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default QuestionMessage;
