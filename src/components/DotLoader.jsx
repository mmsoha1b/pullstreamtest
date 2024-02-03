import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function DotLoader({ content }) {
  return (
    <div className='w-full h-full flex gap-8 flex-col items-center justify-center'>
      {content}
      <ThreeDots
        visible={true}
        height='120'
        width='120'
        color='#9A4822'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
