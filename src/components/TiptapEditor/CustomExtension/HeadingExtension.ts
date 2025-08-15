import { mergeAttributes, CommandProps, NodeConfig } from '@tiptap/core'
import Heading, { Level } from '@tiptap/extension-heading'

const CustomHeading = Heading.extend({
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6] as Level[],
      
    }
  },

  renderHTML({
    node,
    HTMLAttributes,
  }: Parameters<NonNullable<NodeConfig['renderHTML']>>[0]) {
    const level: Level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0]

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ]
  },

  addCommands() {
    return {
      setCustomHeading:
        (attributes: { level: Level }) =>
        ({ commands }: CommandProps) => {
          return commands.toggleHeading(attributes)
        },
    }
  },
})

export default CustomHeading
