export default function onNonNumericHandler(event) {
  // prevent other normally allowed numeric keys: e, +, -, .
  if (
    event.keyCode === 69 ||
    event.keyCode === 187 ||
    event.keyCode === 189 ||
    event.keyCode === 190
  ) {
    event.preventDefault();
  }
}
