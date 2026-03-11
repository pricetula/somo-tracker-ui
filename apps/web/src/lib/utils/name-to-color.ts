const avatarColors = [
    "#7b0909", // red
    "#9a4908", // orange
    "#906804", // yellow
    "#058758", // green
    "#044696", // blue
    "#270981", // purple
    "#72083f", // pink
    "#056b7b"  // cyan
];

export function nameToColor(name: string) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % avatarColors.length;

    return avatarColors[index];
}