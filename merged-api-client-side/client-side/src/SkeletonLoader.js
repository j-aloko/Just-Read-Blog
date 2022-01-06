import ContentLoader from "react-content-loader";

//Skeleton Loader
export const MyPostImageLoader = () => (
  <ContentLoader
    height={360}
    width={420}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
  >
    <rect x="0" y="10" rx="5" ry="5" width="420" height="320" />
  </ContentLoader>
);

export const MyPostTitleLoader = () => (
  <ContentLoader
    width={420}
    height={20}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
  >
    <rect x="0" y="0" rx="0" ry="0" width="420" height="30" />
  </ContentLoader>
);

//Skeleton Loader
export const MyReadPostImageLoader = () => (
  <ContentLoader
    height={500}
    width={900}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
    speed={3}
  >
    <rect x="0" y="0" rx="0" ry="0" width="900" height="450" />
  </ContentLoader>
);

export const MyReadPostTitleLoader = () => (
  <ContentLoader
    width={800}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
    speed={1}
  >
    <rect x="0" y="0" rx="0" ry="0" width="800" height="40" />
  </ContentLoader>
);

export const AuthorAndTimeStamp = () => (
  <ContentLoader backgroundColor={"#808080"} foregroundColor={"#999"} speed={1}>
    <rect x="0" y="0" rx="4" ry="4" width="150" height="13" />
  </ContentLoader>
);

export const Description = () => (
  <ContentLoader width={800} height={40} foregroundColor={"#999"} speed={1}>
    <rect x="0" y="0" rx="0" ry="0" width="800" height="40" />
  </ContentLoader>
);

export const MySidebarImageLoader = () => (
  <ContentLoader speed={3} backgroundColor={"#808080"} foregroundColor={"#999"}>
    <rect x="100" y="10" rx="120" ry="120" width="100" height="100" />
  </ContentLoader>
);

export const MySidebarDescriptionLoader = () => (
  <ContentLoader
    width={300}
    height={20}
    speed={3}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
  >
    <rect x="0" y="5" rx="0" ry="0" width="300" height="20" />
  </ContentLoader>
);

export const MySidebarCategoryLoader = () => (
  <ContentLoader
    width={300}
    height={60}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
    speed={3}
  >
    <rect x="0" y="40" rx="0" ry="0" width="300" height="60" />
  </ContentLoader>
);

export const MySidebarCategoriesLoader = () => (
  <ContentLoader
    height={350}
    width={300}
    backgroundColor={"#808080"}
    foregroundColor={"#999"}
    speed={3}
  >
    <rect x="0" y="20" rx="5" ry="5" width="300" height="320" />
  </ContentLoader>
);
