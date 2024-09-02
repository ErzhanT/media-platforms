class MediaPlatforms {
  #platformsMap = new Map();

  constructor(platforms) {
    for (const [locations, platformsList] of Object.entries(platforms)) {
      const locationArray = locations.split(",");
      locationArray.forEach((location) => {
        this.#platformsMap.set(location.trim(), platformsList);
      });
    }
  }

  getPlatformsForLocation(location) {
    let result = [];

    for (const [region, platforms] of this.#platformsMap) {
      if (this.locationMatches(region, location)) {
        result.push(...platforms);
      }
    }

    return [...new Set(result)];
  }

  locationMatches(region, location) {
    return location.startsWith(region);
  }
}

const platforms = {
  "/ru": ["Яндекс.Директ"],
  "/ru/svrd/ekb": ["Быстрый курьер"],
  "/ru/svrd/revda,/ru/svrd/pervik": ["Ревдинский рабочий"],
  "/ru/msk,/ru/permobl,/ru/chelobl": ["Газета уральских москвичей"],
  "/be/msk": ["Беларусская правда"],
};

const mediaPlatforms = new MediaPlatforms(platforms);

console.log(
  "Для локации /ru/msk:",
  mediaPlatforms.getPlatformsForLocation("/ru/msk").join(", ")
);
// результат: Газета уральских москвичей, Яндекс.Директ

console.log(
  "Для локации /ru:",
  mediaPlatforms.getPlatformsForLocation("/ru").join(", ")
);
// результат: Яндекс.Директ

console.log(
  "Для локации /ru/svrd:",
  mediaPlatforms.getPlatformsForLocation("/ru/svrd").join(", ")
);
// результат: Яндекс.Директ

console.log(
  "Для локации /ru/permobl:",
  mediaPlatforms.getPlatformsForLocation("/ru/permobl").join(", ")
);
// результат: Газета уральских москвичей, Яндекс.Директ

