import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES} from '../../../utils';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
//use Markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
//use react-select
import Select from 'react-select';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            doctors: [],
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors();
    }

    
    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let obj = {};
                let lableVi = `${item.lastName} ${item.firstName}`;
                let lableEn = `${item.firstName} ${item.lastName}`;
                obj.label = this.props.languageRedux === LANGUAGES.VI ? lableVi: lableEn;
                obj.value = item.id;
                result.push(obj);
            })   
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.doctorsRedux !== this.props.doctorsRedux){
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                doctors: dataSelect
            })
        }
        if(prevProps.languageRedux !== this.props.languageRedux){
            let dataList = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                doctors: dataList,  
            })
        }
    }

    handleEditorChange= ({text, html}) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
       // console.log('check state: ', this.state)
        this.props.createInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        })
    }

    handleChange =  option => {
        this.setState({ 
                selectedOption: option
            });
    };

    handleOnchangeDesc = (event) =>{
        this.setState({
            description: event.target.value,
        })
    }


    render() {
        //console.log('check state: ', this.state)
        //let arrDoctors = this.state.doctors;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tao thêm thông tin doctor
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ:</label>
                        <Select 
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                        />
                    </div> 
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='5' 
                        onChange={(event)=> this.handleOnchangeDesc(event)}
                        value={this.state.description}/>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} />
                </div> 
                <div>
                    <button className='save-content-doctor'
                    onClick={()=> this.handleSaveContentMarkdown()}>Lưu thông tin</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctorsRedux: state.admin.allDoctors,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    };
};

//đưa mapStateToProps và mapDispatchToProps vào bên trong component
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
