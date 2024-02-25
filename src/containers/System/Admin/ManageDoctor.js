import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES} from '../../../utils';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
//use Markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
//use react-select
import Select from 'react-select';
import { getDoctorDetailsService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            doctors: [],
            hasOldData: false,
            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfo();
    }

    
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if(inputData && inputData.length > 0){
            if(type === 'USERS'){
                inputData.map((item, index) => {
                    let obj = {};
                    let lableVi = `${item.lastName} ${item.firstName}`;
                    let lableEn = `${item.firstName} ${item.lastName}`;
                    obj.label = this.props.languageRedux === LANGUAGES.VI ? lableVi: lableEn;
                    obj.value = item.id;
                    result.push(obj);
                    return item;
                })   
            }
            if(type === 'PRICE'){
                inputData.map((item, index) => {
                    let obj = {};
                    let lableVi = `${item.valueVi} VNĐ`;
                    let lableEn = `${item.valueEn} USD`;
                    obj.label = this.props.languageRedux === LANGUAGES.VI ? lableVi: lableEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                    return item;
                })   
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputData.map((item, index) => {
                    let obj = {};
                    let lableVi = item.valueVi;
                    let lableEn = item.valueEn;
                    obj.label = this.props.languageRedux === LANGUAGES.VI ? lableVi: lableEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                    return item;
                })   
            }
            
            
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.doctorsRedux !== this.props.doctorsRedux){
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux, 'USERS');
            this.setState({
                doctors: dataSelect
            })
        }
     
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfo;
        
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
         
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

        if(prevProps.languageRedux !== this.props.languageRedux){
            let dataList = this.buildDataInputSelect(this.props.doctorsRedux, 'USERS');
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                doctors: dataList,  
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
        let {hasOldData} = this.state;
        this.props.saveInfoDoctor({
            //save markdown table
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            //truyền thêm action create/edit cho Backend (doctorService > saveDoctorDetails)
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        
            //save doctor_info table
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        
        })
        //console.log('hasOldData: ', hasOldData);
    }

    //onchange Doctor
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption});
        
        let res = await getDoctorDetailsService(selectedOption.value);
        if(res && res.errCode === 0 && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
        //console.log('getDoctorDetailsService: ', res)
    };

    //onchange dropdown chon gia, chon phuong thuc thanh toan, chon tinh thanh
    handleChangeSelectDoctorInfo = async(selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log('selectedOption: ', selectedOption, 'name: ', name)
    }

    handleOnchangeText = (event, id) =>{
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }



    render() {
        //console.log('check state: ', this.state)
        let {doctors, selectedOption, description, hasOldData} = this.state;
        let { listPrice, listPayment, listProvince, 
            nameClinic, addressClinic, note} = this.state;
     
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title'/>
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ:</label>
                        <Select 
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={doctors}
                            placeholder={'Chọn bác sĩ ...'}
                        />
                    </div> 
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='5' 
                        onChange={(event)=> this.handleOnchangeText(event, 'description')}
                        value={description}/>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá khám</label>
                        <Select 
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPrice}
                            placeholder={'Chọn giá ...'}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Phương thức thanh toán</label>
                        <Select 
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPayment}
                            placeholder={'Chọn phương thức thanh toán ...'}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tỉnh thành</label>
                        <Select 
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listProvince}
                            placeholder={'Chọn tỉnh thành ...'}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                        value={nameClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control'
                         onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                         value={addressClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                         onChange={(event) => this.handleOnchangeText(event, 'note')}
                         value={note}/>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown} />
                </div> 
                <div>
                    <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={()=> this.handleSaveContentMarkdown()}>
                        {hasOldData === true ? <span>Lưu Thông tin</span> : <span>Tạo Thông tin</span>}
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctorsRedux: state.admin.allDoctors,
        languageRedux: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    };
};

//đưa mapStateToProps và mapDispatchToProps vào bên trong component
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
