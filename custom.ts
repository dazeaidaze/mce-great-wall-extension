namespace GreatWall {
    /**
     * Builds a section of the Great Wall with double-sided battlements (垛墙) and parapets (女儿墙).
     * @param length the length of the wall
     * @param height the height of the wall (≥ 2 recommended)
     * @param thickness the thickness of the wall (≥ 2 recommended)
     */
    //% block
    export function buildGreatWall(length: number, height: number, thickness: number): void {
        const start = player.position()
        const startX = start.getValue(Axis.X)
        const startY = start.getValue(Axis.Y)
        const startZ = start.getValue(Axis.Z)

        // 1. 建造墙体主体
        for (let x = 0; x < length; x++) {
            for (let y = 0; y < height; y++) {
                for (let z = 0; z < thickness; z++) {
                    blocks.place(
                        STONE,
                        world(startX + x, startY + y, startZ + z)
                    )
                }
            }
        }

        // 2. 添加垛墙（每隔一格）+ 女儿墙（连续）
        for (let x = 0; x < length; x++) {
            blocks.place(STONE, world(startX + x, startY + height, startZ)) // 左侧
            blocks.place(STONE, world(startX + x, startY + height, startZ + thickness - 1)) // 右侧
        }

        // 3. 垛墙（每隔一格）建在女儿墙上方，即 height + 1 层
        for (let x = 0; x < length; x++) {
            if (x % 2 === 0) {
                blocks.place(STONE, world(startX + x, startY + height + 1, startZ)) // 左侧
                blocks.place(STONE, world(startX + x, startY + height + 1, startZ + thickness - 1)) // 右侧
            }

        }
    }
}
