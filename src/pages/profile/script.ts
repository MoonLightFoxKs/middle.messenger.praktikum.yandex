function handleOnClick(
  showDiv: string,
  hideFirstDiv: string,
  hideSecondDiv: string
) {
  const showElement = document.getElementById(showDiv);
  const hideFirstElement = document.getElementById(hideFirstDiv);
  const hideSecondElement = document.getElementById(hideSecondDiv);

  if (showElement?.getAttribute("style")) {
    showElement!.removeAttribute("style");
  }
  hideFirstElement!.style.display = "none";
  hideSecondElement!.style.display = "none";
}

document
  .getElementById("changeInfo")
  ?.addEventListener("click", () =>
    handleOnClick("editInfo", "profileInfo", "editPassword")
  );
document
  .getElementById("changePassword")
  ?.addEventListener("click", () =>
    handleOnClick("editPassword", "profileInfo", "editInfo")
  );
