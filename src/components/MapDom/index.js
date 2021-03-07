import React from 'react';

function MapDom({ dataSource, render }) {
  return (
    <>
      {dataSource.map((item, index) => {
        return render(item, index);
      })}
    </>
  );
}

export default MapDom;
