import React from "react";

export default function Error({ error }) {
  return (
    <div className='w-full h-full flex gap-8 flex-col items-center justify-center'>
      <h2 className='text-3xl'>Error Occured</h2>
      <p>{error} </p>
    </div>
  );
}
