const express= require('express')
const hbs= require('hbs')
const fs = require('fs');
const { log } = require('console');

var app=express();
const port =process.env.PORT||3000;

const path=require('path')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs');
app.use((req,res,next)=>
{
console.log("Executing");
next();
});
app.use((req,res,next)=>
{
var log=`${req.url} ${req.method}`
console.log(log);

fs.appendFile('logfile.log',log+'\n',(err)=>
{
if(err)
{
console.log("some error");
}
});
next();
});

app.get('/', (req, res) => {
    res.render('index', {
    title: 'ExpressApp',
    name: 'MyName'
    })
    })
    
    app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About Me',
    name: 'MyName'
    })
    })
    
    app.get('/help', (req, res) => {
    res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'MyName'
    })
    })

    app.get('/intro', (req, res) => {
        res.render('intro', {
        helpText: 'This is Introduction Content!',
        title: 'Introduction',
        name: 'MyName'
    })
    })
    
    app.get('/history', (req, res) => {
            res.render('history', {
            helpText: 'This page contains some history.',
            title: 'History',
            name: 'MyName'
    })
    })

    app.get('/help/*', (req, res) => {
        res.render('404', {
        title: '404',
        name: 'MyName',
        errorMessage: 'Help article not found.'
    })
    })
        
    app.get('*', (req, res) => {
        res.render('404', {
        title: '404',
        name: 'MyName',
        errorMessage: 'Page not found.'
    })
    })

    app.listen(3000,()=>{
        console.log("Server running")
    })