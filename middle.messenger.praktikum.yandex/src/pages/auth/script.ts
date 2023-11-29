function handleClick(divId:string) {
    const element = document.getElementById(divId);
    const hidden = element?.getAttribute("style");

    if (hidden) {
        element?.removeAttribute("style");
    } else {
        element!.style.display = 'none';
    }
}