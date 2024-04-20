import { setupCodeSnippet } from '@/constants/snippet';
import { useProjectStore } from '@/store/useProjectStore';
import { CopyBlock, solarizedLight } from 'react-code-blocks';

type Props = {}

function Dashboard({}: Props) {
  const currentProject = useProjectStore(state => state.currentProject)

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