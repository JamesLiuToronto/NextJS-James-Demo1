import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]

// Mock data for development/testing
export const mockTasks = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium"
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium"
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high"
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "backlog",
    label: "feature",
    priority: "medium"
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the AI panel!",
    status: "canceled",
    label: "feature",
    priority: "medium"
  },
  {
    id: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "done",
    label: "bug",
    priority: "high"
  },
  {
    id: "TASK-7262",
    title: "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
    status: "done",
    label: "feature",
    priority: "high"
  },
  {
    id: "TASK-1138",
    title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "in progress",
    label: "feature",
    priority: "medium"
  },
  {
    id: "TASK-7184",
    title: "We need to program the back-end THX pixel!",
    status: "todo",
    label: "feature",
    priority: "low"
  },
  {
    id: "TASK-5160",
    title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "in progress",
    label: "documentation",
    priority: "high"
  },
  {
    "id": "TASK-5326",
    "title": "We need to hack the redundant UTF8 transmitter!",
    "status": "todo",
    "label": "bug",
    "priority": "low"
  },
  {
    "id": "TASK-6274",
    "title": "Use the virtual PCI circuit, then you can parse the bluetooth alarm!",
    "status": "canceled",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "TASK-1571",
    "title": "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
    "status": "in progress",
    "label": "feature",
    "priority": "medium"
  },
  {
    "id": "TASK-9518",
    "title": "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
    "status": "canceled",
    "label": "documentation",
    "priority": "medium"
  },
  {
    "id": "TASK-5581",
    "title": "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
    "status": "backlog",
    "label": "documentation",
    "priority": "high"
  },
  {
    "id": "TASK-2197",
    "title": "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
    "status": "todo",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "TASK-8484",
    "title": "We need to parse the solid state UDP firewall!",
    "status": "in progress",
    "label": "bug",
    "priority": "low"
  },
  {
    "id": "TASK-9892",
    "title": "If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!",
    "status": "done",
    "label": "documentation",
    "priority": "high"
  },
  {
    "id": "TASK-9616",
    "title": "We need to synthesize the cross-platform ASCII pixel!",
    "status": "in progress",
    "label": "feature",
    "priority": "medium"
  },
  {
    "id": "TASK-9744",
    "title": "Use the back-end IP card, then you can input the solid state hard drive!",
    "status": "done",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "TASK-1376",
    "title": "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
    "status": "backlog",
    "label": "documentation",
    "priority": "low"
  },
  {
    "id": "TASK-7382",
    "title": "If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!",
    "status": "todo",
    "label": "feature",
    "priority": "low"
  },
  {
    "id": "TASK-2290",
    "title": "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
    "status": "canceled",
    "label": "documentation",
    "priority": "high"
  },
  {
    "id": "TASK-1533",
    "title": "You can't input the firewall without overriding the wireless TCP firewall!",
    "status": "done",
    "label": "bug",
    "priority": "high"
  },
  {
    "id": "TASK-4920",
    "title": "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
    "status": "in progress",
    "label": "bug",
    "priority": "high"
  },
  {
    "id": "TASK-5168",
    "title": "If we synthesize the bus, we can get to the IP panel through the virtual TLS array!",
    "status": "in progress",
    "label": "feature",
    "priority": "low"
  },
  {
    "id": "TASK-7103",
    "title": "We need to parse the multi-byte EXE bandwidth!",
    "status": "canceled",
    "label": "feature",
    "priority": "low"
  },
  {
    "id": "TASK-4314",
    "title": "If we compress the program, we can get to the XML alarm through the multi-byte COM matrix!",
    "status": "in progress",
    "label": "bug",
    "priority": "high"
  },
]

if (typeof window !== 'undefined') {
  // browser-only code
}
