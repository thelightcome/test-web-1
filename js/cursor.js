const cursor = $(".cursor");

$(document).on("mousemove", (e) => {
  cursor.css("transform", "translate(" + e.clientX + "px, " + e.clientY + "px)");
});
