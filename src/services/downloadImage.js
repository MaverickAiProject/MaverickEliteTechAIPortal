export const handleDownloadImage = (imgLink) => {
  const link = document.createElement("a");
  link.href = imgLink;
  link.download = "Maverick-generated-image.png";
  link.click();
};
