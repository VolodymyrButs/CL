export const fileDxf = (elementDxf: string) => {
    return `0
SECTION
2
ENTITIES
${elementDxf}0
ENDSEC
0
EOF
`
}
