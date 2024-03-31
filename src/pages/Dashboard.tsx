import { setupCodeSnippet } from '@/constants/snippet';
import { useProjectStore } from '@/store/useProjectStore';
import React from 'react'
import { CopyBlock, solarizedLight } from 'react-code-blocks';
import io from 'socket.io-client';

type Props = {}

function Dashboard({}: Props) {
  const currentProject = useProjectStore(state => state.currentProject)

  React.useEffect(() => {
     // Define custom headers
      //   const headers = {
      //     Authorization: `Bearer ${Math.random() * 100000}`,
      //     CustomHeader: 'CustomValue',
      //   };

      // // Establish a connection to the server
      // const socket = io('ws://localhost:5000', {
      //     transportOptions: {
      //       polling: {
      //         extraHeaders: headers,
      //       },
      //     },
      //   });

      //   // Event listeners
      //   socket.on('connect', () => {
      //     console.log('Connected to WebSocket server');
      //   });

      //   socket.on('message', (data) => {
      //     console.log('Received:', data);
      //   });

      //   socket.on('disconnect', () => {
      //     console.log('Disconnected from WebSocket server');
      //   });

      //   socket.on('error', (error) => {
      //     console.error('WebSocket error:', error);
      //   });

      //   setInterval(() => {
      //     socket.emit("session", "hi")
      //   }, 1000)

  }, [])
  return (
    <>
        <p className='text-lg font-bold text-center'>Setup in your project</p>
        <div className='min-w-[50%] w-[50%] overflow-visible  mx-auto'>
          <CopyBlock
            text={setupCodeSnippet(currentProject?.apiKey)}
            language={"jsx"}
            showLineNumbers={true}
            theme={solarizedLight}
            wrapLongLines={true}
          />
          {/* <CodeBlock
            text={setupCodeSnippet(currentProject?.apiKey)}
            language={"jsx"}
            showLineNumbers={true}
            theme={solarizedLight}
            wrapLongLines={true}
          /> */}
        </div>
    </>
  )
}

export default Dashboard