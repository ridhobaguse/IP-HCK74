import React from "react";

const CardWeapon = ({ id, title, image, stats, shopData }) => {
  return (
    <div
      key={id}
      className="max-w-sm mx-auto bg-[#4a272a] text-white rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="w-auto h-auto rounded-lg mt-2 mb-4"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {shopData && shopData.category && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">
              Category: {shopData.category}
            </p>
            {shopData.categoryImage && (
              <img
                src={shopData.categoryImage}
                alt={shopData.category}
                className="w-full h-auto mt-2"
              />
            )}
          </div>
        )}
        {stats && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Stats:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Fire Rate:</span> {stats.fireRate}
              </li>
              <li>
                <span className="font-medium">Magazine Size:</span>{" "}
                {stats.magazineSize}
              </li>
              <li>
                <span className="font-medium">Equip Time:</span>{" "}
                {stats.equipTimeSeconds}s
              </li>
              <li>
                <span className="font-medium">Reload Time:</span>{" "}
                {stats.reloadTimeSeconds}s
              </li>
              <li>
                <span className="font-medium">First Bullet Accuracy:</span>{" "}
                {stats.firstBulletAccuracy}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardWeapon;
