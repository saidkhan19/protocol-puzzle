export type ProtocolField = {
  name: string;
  description: string;
  size?: string;
};

export type ProtocolFrame = {
  protocolId: string;
  frameTitle: string;
  gameTitle: string;
  fields: Record<string, ProtocolField>;
  structure: { fieldKey: string; width: number }[][];
  difficulty: "easy" | "medium" | "hard";
};

export type Protocol = {
  id: string;
  title: string;
  secondTitle: string;
  description: string;
};

export const PROTOCOLS: Protocol[] = [
  {
    id: "http",
    title: "HTTP",
    secondTitle: "Hypertext Transfer Protocol",
    description:
      "Application layer protocol for transmitting hypermedia documents, such as HTML. It is the foundation of data communication for the World Wide Web.",
  },
  {
    id: "tcp",
    title: "TCP",
    secondTitle: "Transmission Control Protocol",
    description:
      "Connection-oriented transport layer protocol that provides reliable, ordered, and error-checked delivery of data between applications.",
  },
  {
    id: "udp",
    title: "UDP",
    secondTitle: "User Datagram Protocol",
    description:
      "Connectionless transport layer protocol that provides a simple, unreliable message delivery service with minimal protocol overhead. Faster than TCP; used where speed matters more than reliability (DNS, VoIP, gaming).",
  },
  {
    id: "ipv4",
    title: "IPv4",
    secondTitle: "Internet Protocol version 4",
    description:
      "Network layer protocol that provides addressing and routing of packets across networks using 32-bit addresses.",
  },
  {
    id: "ipv6",
    title: "IPv6",
    secondTitle: "Internet Protocol version 6",
    description:
      "Next-generation network layer protocol that provides addressing and routing using 128-bit addresses, designed to replace IPv4.",
  },
  {
    id: "icmp",
    title: "ICMP",
    secondTitle: "Internet Control Message Protocol",
    description:
      "Network layer protocol used for diagnostic and error reporting purposes, such as ping and traceroute operations.",
  },
  {
    id: "ethernet",
    title: "Ethernet II",
    secondTitle: "Ethernet Frame",
    description:
      "Data link layer protocol that defines the format for frames transmitted over Ethernet networks, including MAC addressing.",
  },
] as const;

export const FRAMES: ProtocolFrame[] = [
  {
    protocolId: "http",
    frameTitle: "Request",
    gameTitle: "HTTP Request",
    difficulty: "easy",
    fields: {
      method: {
        name: "Method",
        description:
          "HTTP method - examples: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
      },
      uri: {
        name: "Request URI",
        description:
          "The resource path being requested: /index.html, /api/users/123, /search?q=test",
      },
      version: {
        name: "HTTP Version",
        description:
          "HTTP protocol version - examples: HTTP/1.1, HTTP/2, HTTP/3",
      },
      headers: {
        name: "Headers",
        description:
          "Request headers - examples: Host: www.example.com, User-Agent: Mozilla/5.0, Accept: text/html, Content-Type: application/json",
      },
      body: {
        name: "Message Body",
        description:
          "Optional request payload data - examples: JSON data, form data, file uploads",
      },
    },
    structure: [
      [
        { fieldKey: "method", width: 25 },
        { fieldKey: "uri", width: 50 },
        { fieldKey: "version", width: 25 },
      ],
      [{ fieldKey: "headers", width: 100 }],
      [{ fieldKey: "body", width: 100 }],
    ],
  },
  {
    protocolId: "http",
    frameTitle: "Response",
    gameTitle: "HTTP Response",
    difficulty: "easy",
    fields: {
      version: {
        name: "HTTP Version",
        description:
          "HTTP protocol version - examples: HTTP/1.1, HTTP/2, HTTP/3",
      },
      statusCode: {
        name: "Status Code",
        description:
          "Three-digit response code - examples: 200 (OK), 404 (Not Found), 500 (Internal Server Error), 301 (Moved Permanently)",
      },
      statusText: {
        name: "Status Text",
        description:
          "Human-readable status description - examples: OK, Not Found, Internal Server Error, Forbidden",
      },
      headers: {
        name: "Headers",
        description:
          "Response headers - examples: Content-Type: text/html, Content-Length: 1234, Set-Cookie: session=abc123, Cache-Control: no-cache",
      },
      body: {
        name: "Message Body",
        description:
          "Response payload data - examples: HTML page, JSON response, image data, file download",
      },
    },
    structure: [
      [
        { fieldKey: "version", width: 25 },
        { fieldKey: "statusCode", width: 25 },
        { fieldKey: "statusText", width: 50 },
      ],
      [{ fieldKey: "headers", width: 100 }],
      [{ fieldKey: "body", width: 100 }],
    ],
  },
  {
    protocolId: "tcp",
    frameTitle: "TCP",
    gameTitle: "TCP",
    difficulty: "hard",
    fields: {
      srcPort: {
        name: "Source Port",
        description:
          "Port number of the sending application - examples: 80 (HTTP), 443 (HTTPS), 22 (SSH), 3306 (MySQL)",
        size: "16 bits",
      },
      dstPort: {
        name: "Destination Port",
        description:
          "Port number of the receiving application - examples: 80 (HTTP), 443 (HTTPS), 25 (SMTP), 21 (FTP)",
        size: "16 bits",
      },
      seqNum: {
        name: "Sequence Number",
        description:
          "Contains the sequence number of the first byte of data in the current segment. Used for reordering and tracking data.",
        size: "32 bits",
      },
      ackNum: {
        name: "Acknowledgment Number",
        description:
          "If the ACK flag is set, this is the sequence number of the next byte the sender is expecting to receive.",
        size: "32 bits",
      },
      dataOffset: {
        name: "Data Offset",
        description:
          "Specifies the length of the TCP header in 4-byte words (minimum 5, maximum 15). Used to find the start of the data payload.",
        size: "4 bits",
      },
      reserved: {
        name: "Reserved",
        description:
          "Reserved for future use, must be zero - always set to 000",
        size: "3 bits",
      },
      flags: {
        name: "Flags",
        description:
          "A set of flags used to manage connection state, flow control, and data transmission.",
        size: "9 bits",
      },
      window: {
        name: "Window Size",
        description:
          "Specifies the size of the receive window (buffer space) the sender of the segment is currently willing to accept, used for flow control.",
        size: "16 bits",
      },
      checksum: {
        name: "Checksum",
        description:
          "Used for error checking. The calculated value ensures the integrity of the header, the payload, and a pseudo-header derived from the IP header.",
        size: "16 bits",
      },
      urgentPtr: {
        name: "Urgent Pointer",
        description:
          "If the URG flag is set, this pointer indicates the offset from the sequence number where urgent data ends.",
        size: "16 bits",
      },
      options: {
        name: "Options",
        description:
          "Optional TCP options. Used for capabilities like Maximum Segment Size (MSS) negotiation, Window Scaling, and Timestamps.",
        size: "0-40 bytes",
      },
      data: {
        name: "Data",
        description: "Application layer payload",
      },
    },
    structure: [
      [
        { fieldKey: "srcPort", width: 50 },
        { fieldKey: "dstPort", width: 50 },
      ],
      [{ fieldKey: "seqNum", width: 100 }],
      [{ fieldKey: "ackNum", width: 100 }],
      [
        { fieldKey: "dataOffset", width: 16.67 },
        { fieldKey: "reserved", width: 8.33 },
        { fieldKey: "flags", width: 25 },
        { fieldKey: "window", width: 50 },
      ],
      [
        { fieldKey: "checksum", width: 50 },
        { fieldKey: "urgentPtr", width: 50 },
      ],
      [{ fieldKey: "options", width: 100 }],
      [{ fieldKey: "data", width: 100 }],
    ],
  },
  {
    protocolId: "udp",
    frameTitle: "UDP",
    gameTitle: "UDP",
    difficulty: "easy",
    fields: {
      srcPort: {
        name: "Source Port",
        description: "Port number of the sending application",
        size: "16 bits",
      },
      dstPort: {
        name: "Destination Port",
        description: "Port number of the receiving application",
        size: "16 bits",
      },
      length: {
        name: "Length",
        description:
          "Specifies the total length of the UDP datagram (header + payload) in bytes. The minimum length is 8 bytes.",
        size: "16 bits",
      },
      checksum: {
        name: "Checksum",
        description:
          "An optional field (in IPv4) used for error checking of the header and the payload. If not used, it is set to zero.",
        size: "16 bits",
      },
      data: {
        name: "Data",
        description: "Application layer payload",
      },
    },
    structure: [
      [
        { fieldKey: "srcPort", width: 50 },
        { fieldKey: "dstPort", width: 50 },
      ],
      [
        { fieldKey: "length", width: 50 },
        { fieldKey: "checksum", width: 50 },
      ],
      [{ fieldKey: "data", width: 100 }],
    ],
  },
  {
    protocolId: "ipv4",
    frameTitle: "IPv4",
    gameTitle: "IPv4",
    difficulty: "hard",
    fields: {
      version: {
        name: "Version",
        description: "IP version number - always 4 for IPv4",
        size: "4 bits",
      },
      ihl: {
        name: "IHL",
        description:
          "Internet Header Length in 32-bit words - examples: 5 (20 bytes, no options), 6 (24 bytes), up to 15 (60 bytes max)",
        size: "4 bits",
      },
      tos: {
        name: "Type of Service",
        description:
          "Used for Quality of Service (QoS) and congestion control, prioritizing certain traffic (e.g., VoIP).",
        size: "8 bits",
      },
      totalLength: {
        name: "Total Length",
        description:
          "The total size of the entire IP packet (header + payload) in bytes.",
        size: "16 bits",
      },
      identification: {
        name: "Identification",
        description:
          "Unique identifier for fragment reassembly. Used to identify fragments belonging to the same original datagram.",
        size: "16 bits",
      },
      flags: {
        name: "Flags",
        description:
          "Control bits for fragmentation (Don't Fragment, More Fragments).",
        size: "3 bits",
      },
      fragmentOffset: {
        name: "Fragment Offset",
        description:
          "Indicates the position of the fragment's data in the original unfragmented datagram.",
        size: "13 bits",
      },
      ttl: {
        name: "TTL",
        description:
          "A hop counter that is decremented by each router. If it reaches 0, the packet is discarded to prevent infinite loops.",
        size: "8 bits",
      },
      protocol: {
        name: "Protocol",
        description:
          "Identifies the protocol carried in the payload (e.g., 6 for TCP, 17 for UDP).",
        size: "8 bits",
      },
      headerChecksum: {
        name: "Header Checksum",
        description:
          "Used for error checking only on the header. Recalculated at every router due to the changing TTL field.",
        size: "16 bits",
      },
      srcAddr: {
        name: "Source IP Address",
        description: "The IPv4 address of the sender.",
        size: "32 bits",
      },
      dstAddr: {
        name: "Destination IP Address",
        description: "The IPv4 address of the intended receiver.",
        size: "32 bits",
      },
      options: {
        name: "Options",
        description:
          "Used for experimental features, debugging, or security, but rarely used in modern networks.",
        size: "0-40 bytes",
      },
      data: {
        name: "Data",
        description:
          "Transport layer payload (TCP segment, UDP datagram, ICMP message etc.).",
      },
    },
    structure: [
      [
        { fieldKey: "version", width: 12.5 },
        { fieldKey: "ihl", width: 12.5 },
        { fieldKey: "tos", width: 25 },
        { fieldKey: "totalLength", width: 50 },
      ],
      [
        { fieldKey: "identification", width: 50 },
        { fieldKey: "flags", width: 8.33 },
        { fieldKey: "fragmentOffset", width: 41.67 },
      ],
      [
        { fieldKey: "ttl", width: 25 },
        { fieldKey: "protocol", width: 25 },
        { fieldKey: "headerChecksum", width: 50 },
      ],
      [{ fieldKey: "srcAddr", width: 100 }],
      [{ fieldKey: "dstAddr", width: 100 }],
      [{ fieldKey: "options", width: 100 }],
      [{ fieldKey: "data", width: 100 }],
    ],
  },
  {
    protocolId: "ipv6",
    frameTitle: "IPv6",
    gameTitle: "IPv6",
    difficulty: "medium",
    fields: {
      version: {
        name: "Version",
        description: "IP version number - always 6 for IPv6",
        size: "4 bits",
      },
      trafficClass: {
        name: "Traffic Class",
        description:
          "Similar to IPv4's ToS; used for QoS and traffic priority (DiffServ).",
        size: "8 bits",
      },
      flowLabel: {
        name: "Flow Label",
        description:
          "A new field used by the source to label a sequence of packets that require the same handling by routers, improving efficiency for streams.",
        size: "20 bits",
      },
      payloadLength: {
        name: "Payload Length",
        description:
          "Specifies the length of the payload only (data + extension headers), excluding the main 40-byte IPv6 header.",
        size: "16 bits",
      },
      nextHeader: {
        name: "Next Header",
        description:
          "Identifies the protocol carried in the payload OR the type of the first extension header immediately following the main header.",
        size: "8 bits",
      },
      hopLimit: {
        name: "Hop Limit",
        description:
          "Equivalent to IPv4's TTL. Decremented by one at each router; packet is discarded if it reaches 0.",
        size: "8 bits",
      },
      srcAddr: {
        name: "Source IP Address",
        description: "The IPv6 address of the sender.",
        size: "128 bits",
      },
      dstAddr: {
        name: "Destination IP Address",
        description: "The IPv6 address of the intended receiver.",
        size: "128 bits",
      },
      data: {
        name: "Data",
        description:
          "Transport layer payload or extension headers (TCP segment, UDP datagram, ICMPv6, extension headers Routing, Fragment, etc.).",
      },
    },
    structure: [
      [
        { fieldKey: "version", width: 12.5 },
        { fieldKey: "trafficClass", width: 25 },
        { fieldKey: "flowLabel", width: 62.5 },
      ],
      [
        { fieldKey: "payloadLength", width: 50 },
        { fieldKey: "nextHeader", width: 25 },
        { fieldKey: "hopLimit", width: 25 },
      ],
      [{ fieldKey: "srcAddr", width: 100 }],
      [{ fieldKey: "dstAddr", width: 100 }],
      [{ fieldKey: "data", width: 100 }],
    ],
  },
  {
    protocolId: "icmp",
    frameTitle: "ICMP",
    gameTitle: "ICMP",
    difficulty: "medium",
    fields: {
      type: {
        name: "Type",
        description:
          "Identifies the type of ICMP message (e.g., Echo Request, Destination Unreachable, Time Exceeded).",
        size: "8 bits",
      },
      code: {
        name: "Code",
        description:
          "Provides additional detail about the message Type (e.g., for 'Destination Unreachable', the code specifies why it is unreachable: network, host, or port).",
        size: "8 bits",
      },
      checksum: {
        name: "Checksum",
        description:
          "Used for error checking of the entire ICMP message (header + data).",
        size: "16 bits",
      },
      restOfHeader: {
        name: "Rest of Header",
        description:
          "This field's contents depend entirely on the values of the Type and Code fields. It is often used for data like the identifier and sequence number in an Echo message.",
        size: "32 bits",
      },
      data: {
        name: "Data",
        description:
          "Typically contains the entire IP header and the first 8 bytes of the data from the original packet that caused the error.",
      },
    },
    structure: [
      [
        { fieldKey: "type", width: 25 },
        { fieldKey: "code", width: 25 },
        { fieldKey: "checksum", width: 50 },
      ],
      [{ fieldKey: "restOfHeader", width: 100 }],
      [{ fieldKey: "data", width: 100 }],
    ],
  },
  {
    protocolId: "ethernet",
    frameTitle: "Ethernet II",
    gameTitle: "Ethernet II",
    difficulty: "medium",
    fields: {
      preamble: {
        name: "Preamble",
        description:
          "A sequence of alternating 1s and 0s (10101010) used to synchronize the receiving system's clock with the incoming data stream.",
        size: "7 bytes",
      },
      sfd: {
        name: "SFD",
        description:
          "Marks the end of the Preamble and the start of the actual frame data (10101011).",
        size: "1 byte",
      },
      dstMac: {
        name: "Destination MAC",
        description:
          "The physical (MAC) address of the intended receiving device on the local network segment.",
        size: "6 bytes",
      },
      srcMac: {
        name: "Source MAC",
        description: "The physical (MAC) address of the sending device.",
        size: "6 bytes",
      },
      etherType: {
        name: "EtherType",
        description:
          "Identifies the protocol carried in the payload (the network layer protocol). Common values are 0x0800 for IPv4 and 0x86DD for IPv6.",
        size: "2 bytes",
      },
      payload: {
        name: "Payload",
        description:
          "The encapsulated data, which is typically an IP packet. The maximum standard size is 1500 bytes (the standard Ethernet MTU).",
        size: "46-1500 bytes",
      },
      fcs: {
        name: "FCS",
        description:
          "A Cyclic Redundancy Check (CRC) used for error detection. The receiving station performs the same calculation; if the result is different, the frame is assumed corrupted and dropped.",
        size: "4 bytes",
      },
    },
    structure: [
      [
        { fieldKey: "preamble", width: 34 },
        { fieldKey: "sfd", width: 4 },
        { fieldKey: "dstMac", width: 27 },
        { fieldKey: "srcMac", width: 27 },
        { fieldKey: "etherType", width: 8 },
      ],
      [
        { fieldKey: "payload", width: 100 },
        { fieldKey: "fcs", width: 100 },
      ],
    ],
  },
] as const;
