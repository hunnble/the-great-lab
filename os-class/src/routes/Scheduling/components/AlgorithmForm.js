import React from 'react'

export class AlgorithmForm extends React.Component {
  renderAlgorithmBar = (category) => {
    return (
      <div>
        {
          category.items.map((algorithm, index) => (
            <div key={category.key + index} className='radio'>
              <label>
                <input type='radio' name={category.key} onChange={(e) => {
                  this.props.changeAlgorithm(index, category.key)
                }} checked={index === category.index} value={index} />
                {algorithm}
              </label>
            </div>
          ))
        }
      </div>
    )
  }
  render () {
    const { jobAlgorithm, processAlgorithm, memoryAlgorithm } = this.props.algorithms
    return (
      <form>
        <section className='text-left'>
          <header>Job Control</header>
          {this.renderAlgorithmBar(jobAlgorithm)}
        </section>
        <section className='text-left'>
          <header>Process Control</header>
          {this.renderAlgorithmBar(processAlgorithm)}
        </section>
        <section className='text-left'>
          <header>Memory Control</header>
          {this.renderAlgorithmBar(memoryAlgorithm)}
        </section>
      </form>
    )
  }
}

AlgorithmForm.propTypes = {
  algorithms: React.PropTypes.object.isRequired,
  changeAlgorithm: React.PropTypes.func.isRequired
}

export default AlgorithmForm
