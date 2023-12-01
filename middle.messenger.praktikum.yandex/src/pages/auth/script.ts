function handleClick(divId:string) {
    const element = document.getElementById(divId);
    const hidden = element?.getAttribute("style");

    if (hidden) {
        element?.removeAttribute("style");
    } else {
        element!.style.display = 'none';
    }
}

document.getElementById("singinText")?.addEventListener("click",()=>handleClick("signin"))
document.getElementById("loginText")?.addEventListener("click",()=>handleClick("signin"))